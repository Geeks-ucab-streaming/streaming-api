import { DataSource, getMetadataArgsStorage } from 'typeorm';

export class DataSourceSingleton {
  static instance: DataSource;

  static getInstance() {
    if (!DataSourceSingleton.instance) {
      DataSourceSingleton.instance = new DataSource({
        type: 'postgres',
        url: process.env.HOST,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });
      this.instance.initialize();
    }

    return DataSourceSingleton.instance;
  }

}
