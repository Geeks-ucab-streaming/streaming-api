import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// IMPORTAR EL CONFIG SERVICES DEN NEST PARA USAR LOS ENVS
import { ConfigService } from '@nestjs/config';

// INSTANCIAR EL CONFIG SERVICE
const configService = new ConfigService();
console.log(configService.get('HOST'));
const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: configService.get('HOST'),
    port: parseInt(configService.get('PORT')),
    username: configService.get('BD_USERNAME'),
    password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    entities: [],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
};

export default config;