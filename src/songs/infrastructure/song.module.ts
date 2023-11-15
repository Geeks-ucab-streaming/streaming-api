import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { SongEntity } from './entities/song.entity';
import { SongRepository } from './repositories/song.repository.impl';
import { SongsController } from './controllers/song.controller';
import { GetSongByIdService } from '../application/services/GetSongById.service';
import { SongFactory } from './songFactory';
import { FindSongsByArtistIdService } from '../application/services/getSongsByArtist.service';
import { SongsByArtistIdRepository } from './repositories/songsByArtistRepository';
import { TransmitWsGateway } from './sockets/transmit-ws.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  providers: [
    TransmitWsGateway,
    {
      provide: 'IGenericRepository',
      useClass: SongRepository,
    },
    {
      provide: 'GetSongById',
      useClass: GetSongByIdService,
    },
    {
      provide: 'SongsByArtistIdRepository',
      useClass: SongsByArtistIdRepository,
    },
    {
      provide: 'FindSongsByArtistIdService',
      useClass: FindSongsByArtistIdService,
    },
    {
      provide: 'GetSongImageService',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
    {
      provide: 'GetAudioService',
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
