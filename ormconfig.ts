import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.HOST,
    entities: [],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
};

export default config;