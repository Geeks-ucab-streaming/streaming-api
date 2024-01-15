import { AudithEntity } from 'src/common/infrastructure/entities/audith.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.HOST,
  entities: [__dirname + '/*/.entity{.ts,.js}',AudithEntity],
  migrations: [__dirname + '/migrations/*/{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
export default config;
