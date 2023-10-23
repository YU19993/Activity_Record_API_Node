// src/models/quest-benefactors.model.ts

import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';

@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quest_benefactors', // Explicitly specify the table name
    },
  }
})
export class QuestBenefactory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  questID: number;

  @property({
    type: 'number',
    required: true,
  })
  benefactorID: number;

  @property({
    type: 'number',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestBenefactory>) {
    super(data);
  }
}

export interface QuestBenefactoryRelations {
  // describe navigational properties here
}

export type QuestBenefactoryWithRelations = QuestBenefactory & QuestBenefactoryRelations;
