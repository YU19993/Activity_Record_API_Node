import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';
@model({
  settings: {
    strict: false,
    mysql: {
      schema: dbConfig.database,
      table: 'Participants', // Explicitly specify the table name
    },
  }
})
export class User extends Entity {
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
  Email: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
