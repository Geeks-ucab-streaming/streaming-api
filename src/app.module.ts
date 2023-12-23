import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsController } from './promotions/infrastructure/controllers/promotions.controller';
import { SongsController } from './songs/infrastructure/controllers/song.controller';
import { PlaylistController } from './playlist/infrastructure/controllers/playlist.controller';
import { UsersController } from './users/infrastructure/controllers/users.controller';
import { ArtistController } from './artists/infrastructure/controllers/artist.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronSchedulerService } from './common/infrastructure/services/cron-scheduler.service';
console.log(config);
console.log(`./deploy/.env.${process.env.NODE_ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./deploy/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot()
    // ArtistModule,
    // SongModule,
    // PlaylistModule,
    // PromotionModule,
  ],
  controllers: [
    AppController,
    PromotionsController,
    SongsController,
    PlaylistController,
    UsersController,
    ArtistController,
  ],
  providers: [AppService, CronSchedulerService],
})
export class AppModule {}
