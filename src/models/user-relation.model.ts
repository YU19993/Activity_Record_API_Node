import {Entity, model, property} from '@loopback/repository';
import {dbConfig} from '../config';
@model({
  settings: {
    strict: false,
    mysql: {
      schema: dbConfig.database,
      table: 'QuesterAllyRelationshipMappings', // Explicitly specify the table name
    },
  }
})
export class QuesterAllyRelationshipMappings extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  questerId: number;

  @property({
    type: 'number',
    required: true,
  })
  allyId: number;

  @property({
    type: 'number',
    required: true,
  })
  masterRelationshipId: number;

  @property({
    type: 'string',
    length: 255,
  })
  relationshipDetail?: string;

  @property({
    type: 'number',
    required: true,
  })
  inviteStatus: number;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  updatedAt: string;

  constructor(data?: Partial<QuesterAllyRelationshipMappings>) {
    super(data);
  }
}

export interface QuesterAllyRelationshipMappingsRelations {
  // describe navigational properties here
}

export type QuesterAllyRelationshipMappingsWithRelations = QuesterAllyRelationshipMappings & QuesterAllyRelationshipMappingsRelations;
