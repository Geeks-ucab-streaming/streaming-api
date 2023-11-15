import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artists/infrastructure/artist.module';
import { SongModule } from './songs/infrastructure/song.module';
import { Playlist } from './playlist/domain/playlist';
import { PlaylistModule } from './playlist/infrastructure/playlist.module';
import { PromotionModule } from './promotions/infrastructure/promotion.module';
console.log(config);
console.log(`./deploy/.env.${process.env.NODE_ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./deploy/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(config),
    ArtistModule,
    SongModule,
    PlaylistModule,
    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
