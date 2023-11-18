import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const isProduction = process.env.NODE_ENV === 'local';

const sslConfig = isProduction
    ? {ssl:false}
    : { ssl: { rejectUnauthorized: false } } ;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.HOST,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: true,
  ...sslConfig
};

export default config;
