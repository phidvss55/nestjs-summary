import { Module, DynamicModule } from '@nestjs/common';
import { QueryRepository } from './query.repository';
import { ConnectionWithDriver, Neo4jConfig } from './neo4j.config.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NEO4J_CONFIG, NEO4J_CONNECTION, NEO4J_DRIVER } from './neo4j.constants';
import { Connection } from 'cypher-query-builder';
import { ConnecitonError, createDatabaseConfig, createDriver } from './neo4j.utils';
import { Neo4jService } from './neo4j.service';

@Module({
  providers: [Neo4jService],
})
export class Neo4jModule {
  static forRoot(config?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        Neo4jService,
        {
          provide: NEO4J_CONFIG,
          // useValue: config,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => createDatabaseConfig(configService, config),
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG, ConfigService],
          useFactory: async (config: Neo4jConfig, configService: ConfigService) => createDriver(config, configService),
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }

  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      imports: [ConfigModule],
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

              //await connection.driver.verifyConnectivity();

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
