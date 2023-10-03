// import { DEFAULT_DATASOURCE } from 'src/common/constants';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Usuario } from '../v1/usuario/entities/usuario.entity';

const databaseEntities = [Usuario];

export interface DatabaseConnectionOptions {
  default: DataSourceOptions;
}

export const databaseConnectionOptions: DatabaseConnectionOptions = {
  default: {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    entities: databaseEntities,
    // migrations: migrations,
    namingStrategy: new SnakeNamingStrategy(),
  },
};

export const databaseProviders = [
  // {
  //     provide: DEFAULT_DATASOURCE,
  //     useFactory: async () => {
  //         const dataSource = new DataSource(
  //             databaseConnectionOptions.default
  //         );
  //         return dataSource.initialize();
  //     },
  //     // scope: Scope.REQUEST,
  // },
];
