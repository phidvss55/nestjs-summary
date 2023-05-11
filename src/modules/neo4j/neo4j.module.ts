import { Module, DynamicModule } from '@nestjs/common';
import { QueryRepository } from './query.repository';
import { ConnectionWithDriver, Neo4jConfig } from './neo4j.config.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { Connection } from 'cypher-query-builder';
import { ConnecitonError, createDatabaseConfig } from './neo4j.utils';

@Module({
  providers: [QueryRepository],
})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => createDatabaseConfig(configService, customConfig),
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const { host, scheme, port, username, password } = config;
              const connection = new Connection(`${scheme}://${host}:${port}`, {
                username,
                password,
              }) as ConnectionWithDriver;

              // await connection.driver.verifyConnectivity();

              console.log('Connection Sucecssfully');

              return connection;
            } catch (error) {
              throw new ConnecitonError(error);
            }
          },
        },
      ],
      exports: [QueryRepository],
    };
  }
}
