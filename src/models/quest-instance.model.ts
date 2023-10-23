// src/models/quest-instance.model.ts
import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';

@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quest_instance', // Explicitly specify the table name
    },
  }
})
export class QuestInstance extends Entity {
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
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'number',
    required: true,
  })
  goalType: string;

  @property({
    type: 'number',
    required: true,
  })
  goalValue?: number;

  @property({
    type: 'number',
    required: true,
  })
  goalUnit?: string;

  @property({
    type: 'number',
    precision: 4, // You can specify precision
    scale: 3,     // And scale according to your needs
  })
  goalPercentage?: number;

  @property({
    type: 'number',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  rewardStatus: string;

  @property({
    type: 'number',
    required: false,
    default: 1,
  })
  privacyOption: string;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestInstance>) {
    super(data);
  }
}

export interface QuestInstanceRelations {
  // describe navigational properties here
}

export type QuestInstanceWithRelations = QuestInstance & QuestInstanceRelations;
