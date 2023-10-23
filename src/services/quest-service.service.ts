import { /* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {IsolationLevel} from '@loopback/repository';

import {QuestInstance} from '../models';
import {
  QuestBenefactoryRepository,
  QuestInstanceRepository,
  QuestParticipantRepository,
  QuestRepository
} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class QuestServiceService {
  constructor(
    @inject('repositories.QuestInstanceRepository')
    public questInstanceRepository: QuestInstanceRepository,
    @inject('repositories.QuestParticipantRepository')
    public questParticipantRepository: QuestParticipantRepository,
    @inject('repositories.QuestBenefactoryRepository')
    public questBenefactorRepository: QuestBenefactoryRepository,
    @inject('repositories.QuestRepository')
    public questRepository: QuestRepository
  ) { }

  async createQuest(data: any): Promise<QuestInstance> {
    // Begin the transaction with 'READ COMMITTED' isolation level
    const tx = await this.questInstanceRepository.dataSource.beginTransaction(IsolationLevel.READ_COMMITTED);

    try {
      const questInstance = await this.questInstanceRepository.create(data.questInstance, {transaction: tx});

      const quest = await this.questRepository.findById(questInstance.questID);

      quest.totalCount = (quest.totalCount || 0) + 1; // Just in case totalCount isn't set, default it to 0 before adding.

      await this.questRepository.updateById(questInstance.questID, quest, {transaction: tx});

      for (const participant of data.participants) {
        participant.questID = questInstance.id;
        await this.questParticipantRepository.create(participant, {transaction: tx});
      }

      for (const benefactor of data.benefactors) {
        benefactor.questID = questInstance.id;
        await this.questBenefactorRepository.create(benefactor, {transaction: tx});
      }

      await tx.commit();
      return questInstance;

    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  async getQuestWithParticipantsAndBenefactors(id: number): Promise<any> {
    const questInstance = await this.questInstanceRepository.findById(id);
    const participants = await this.questParticipantRepository.find({where: {questID: questInstance.id}});
    const benefactors = await this.questBenefactorRepository.find({where: {questID: questInstance.id}});


    return {
      questInstance,
      participants,
      benefactors,
    };

  }

  async getAllQuestsWithParticipantsAndBenefactors(): Promise<any[]> {
    const questInstances = await this.questInstanceRepository.find();
    const results: any[] = [];

    for (const questInstance of questInstances) {
      const participants = await this.questParticipantRepository.find({where: {questID: questInstance.id}});
      const benefactors = await this.questBenefactorRepository.find({where: {questID: questInstance.id}});

      results.push({
        questInstance,
        participants,
        benefactors,
      });
    }

    return results;
  }


  /*
   * Add service methods here
   */
}
