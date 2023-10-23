// src/models/quest-participants.model.ts

import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';

@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quest_participants', // Explicitly specify the table name
    },
  }
})
export class QuestParticipant extends Entity {
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
    type: 'number',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  performance: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestParticipant>) {
    super(data);
  }
}

export interface QuestParticipantRelations {
  // describe navigational properties here
}

export type QuestParticipantWithRelations = QuestParticipant & QuestParticipantRelations;
