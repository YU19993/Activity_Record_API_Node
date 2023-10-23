// src/models/quest-comments.model.ts

import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';
@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quest_comments', // Explicitly specify the table name
    },
  }
})
export class QuestComment extends Entity {
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
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestComment>) {
    super(data);
  }
}

export interface QuestCommentRelations {
  // describe navigational properties here
}

export type QuestCommentWithRelations = QuestComment & QuestCommentRelations;
