import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from 'ormconfig';
import { UsersModule } from '../src/users/infrastructure/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artists/infrastructure/artist.module';
console.log(config);
console.log(`./deploy/.env.${process.env.NODE_ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./deploy/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    ArtistModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

