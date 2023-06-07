import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j.config.interface';
import neo4j, { Driver } from 'neo4j-driver';

export const createDatabaseConfig = (configService: ConfigService, customConfig?: Neo4jConfig): Neo4jConfig => {
  return (
    customConfig || {
      host: configService.get('DATABASE_HOST'),
      password: configService.get('DATABASE_PASSWORD'),
      port: configService.get('DATABASE_PORT'),
      scheme: configService.get('DATABASE_SCHEME'),
      username: configService.get('DATABASE_USERNAME'),
      database: configService.get('DATABASE_DB'),
    }
  );
};

export const createDriver = async (config: Neo4jConfig, configService: ConfigService) => {
  if (!config || Object.keys(config).length < 0) {
    config = createDatabaseConfig(configService, config);
  }

  const driver: Driver = neo4j.driver(
    `${config.scheme}://${config.host}:${config.port}`,
    neo4j.auth.basic(config.username, config.password),
  );

  await driver.verifyConnectivity();

  console.log('Connection established');

  return driver;
};

export class ConnecitonError extends Error {
  public details: string;

  constructor(oldError: Error) {
    super();
    this.message = 'Connection with Neo4j database was not established';
    this.name = 'Connection Error';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
