import DatabaseLogger from 'src/database/database.logger';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceMySqlOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  port: 8083,
  password: 'A@123456789abcd',
  database: 'test',
  entities: ['dist/src/../**/*.entity{.ts,.js}'],
  migrations: ['dist/config/migrations/*.js'],
  logger: new DatabaseLogger(),
  synchronize: false,
};

export const dataSourcePostgresOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nestjs_api',
  entities: ['dist/src/../**/*.entity{.ts,.js}'],
  migrations: ['dist/config/migrations/*.js'],
  logger: new DatabaseLogger(),
  synchronize: false,
};

const dataSource = new DataSource(dataSourcePostgresOptions);

export default dataSource;
