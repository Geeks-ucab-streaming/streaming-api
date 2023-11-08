import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.BD_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
};

export default config;