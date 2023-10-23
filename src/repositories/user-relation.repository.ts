import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuesterAllyRelationshipMappings, QuesterAllyRelationshipMappingsRelations} from '../models';

export class UserRelationRepository extends DefaultCrudRepository<
  QuesterAllyRelationshipMappings,
  typeof QuesterAllyRelationshipMappings.prototype.id,
  QuesterAllyRelationshipMappingsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuesterAllyRelationshipMappings, dataSource);
  }
}
