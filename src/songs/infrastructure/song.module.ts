import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { SongEntity } from './entities/song.entity';
import { SongRepository } from './song.repository.impl';
import { SongsController } from './controllers/song.controller';
import { GetSongByIdService } from '../application/services/GetSongById.service';
import { SongFactory } from './songFactory';
import { Song } from '../domain/song';
@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  providers: [
    {
      provide: 'IGenericRepository',
      useClass: SongRepository,
    },
    {
      provide: 'GetSongById',
      useClass: GetSongByIdService,
    },
    {
      provide: 'GetSongImageService',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
    {
      provide: 'GetSongService',
      useFactory: () => {
        return new GetFileService(process.env.SONGS_CONTAINER);
      },
    },
    {
      provide: 'GetSongPreviewService',
      useFactory: () => {
        return new GetFileService(process.env.PREVIEWS_CONTAINER);
      },
    },
    {
      provide: 'SongFactory',
      useFactory: () => {
        return new SongFactory();
      },
    },
  ],
  controllers: [SongsController],
})
export class SongModule {}
