import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';
@model({
  settings: {
    mysql: {
      schema: dbConfig.database,
      table: 'quests', // Explicitly specify the table name
    },
  }
})
export class Quest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: false,
  })
  totalCount?: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: Date;

  @property({
    type: 'number',
    required: true,
  })
  createdBy: number;

  constructor(data?: Partial<Quest>) {
    super(data);
  }
}

export interface QuestRelations {
  // describe navigational properties here
}

export type QuestWithRelations = Quest & QuestRelations;
