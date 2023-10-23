import {BindingScope, inject, injectable} from '@loopback/core';

import {
  QuestBenefactoryRepository,
  QuestInstanceRepository,
  QuestParticipantRepository
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class QuestParticipentRoleService {
  constructor(
    /* Add @inject to inject parameters */
    @inject('repositories.QuestInstanceRepository')
    public questInstanceRepository: QuestInstanceRepository,
    @inject('repositories.QuestActionRepository')
    public questParticipantRepository: QuestParticipantRepository,
    @inject('repositories.QuestBenefactoryRepository')
    public questBenefactorRepository: QuestBenefactoryRepository) { }

  /*
   * Add service methods here
   */

  async findRoles(questID: number, userID: number): Promise<string[]> {
    const roleNames = [];
    const isCreator = await this.questInstanceRepository.findOne({where: {questID: questID, createdBy: userID}});
    if (isCreator) roleNames.push('Creater');

    const isParticipant = await this.questParticipantRepository.findOne({where: {questID: questID, participantID: userID}});
    if (isParticipant) roleNames.push('Participant');

    const isBenefactor = await this.questBenefactorRepository.findOne({where: {questID: questID, benefactorID: userID}});
    if (isBenefactor) roleNames.push('Benefactor');

    return roleNames;
  }

}
