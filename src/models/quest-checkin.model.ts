// src/models/quest-action-checkins.model.ts

import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';
@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quest_action_checkins', // Explicitly specify the table name
    },
  }
})
export class QuestCheckin extends Entity {
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
  participantID: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestCheckin>) {
    super(data);
  }
}

export interface QuestCheckinRelations {
  // describe navigational properties here
}

export type QuestCheckinWithRelations = QuestCheckin & QuestCheckinRelations;
