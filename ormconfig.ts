import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.HOST,
  entities: [__dirname + '/*/.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*/{.ts,.js}'],
  synchronize: true,
  ssl: false
};

export default config;