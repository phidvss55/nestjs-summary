import { Connection, Query } from 'cypher-query-builder';
import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { NEO4J_CONNECTION } from './neo4j.constants';

@Injectable()
export class QueryRepository implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONNECTION)
    private readonly connection: Connection,
  ) {}

  initQuery(): Query {
    return this.connection.query();
  }

  onApplicationShutdown(signal?: string) {
    this.connection.close();
  }
}
