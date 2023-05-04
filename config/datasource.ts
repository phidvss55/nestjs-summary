import DatabaseLogger from 'src/database/database.logger';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  port: 8083,
  password: 'A@123456789abcd',
  database: 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/config/migrations/*.js'],
  logger: new DatabaseLogger(),
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
