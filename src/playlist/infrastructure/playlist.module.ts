import { Module } from '@nestjs/common';
import { PlaylistEntity } from './entities/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './controllers/playlist.controller';
import { FindAlbumByArtistIDService } from '../application/services/FindAlbumByArtistID';
import { IFindGenericRepository } from 'src/common/domain/ifindgeneric.repository';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { PlaylistRepository } from './Playlist.repository';
import { FindAlbumByPlaylistIDService } from '../application/services/FindAlbumByPlaylistID.service';
import { FindAlbumByPlaylistIDRepository } from './repositories/FindAlbumByPlaylistID.repository';
import { SongFactory } from 'src/songs/infrastructure/songFactory';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  providers: [
    {
      provide: 'PlaylistRepository',
      useClass: PlaylistRepository,
    },
    {
      provide: 'FindAlbumByPlaylistIDRepository',
      useClass: FindAlbumByPlaylistIDRepository,
    },
    {
      provide: 'FindOnePlaylistService',
      useClass: FindAlbumByArtistIDService,
    },
    {
      provide: 'FindPlaylistByIdService',
      useClass: FindAlbumByPlaylistIDService,
    },
    {
      provide: 'GetAlbumImageService',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
    {
      provide: 'SongFactory',
      useFactory: () => {
        return new SongFactory();
      },
    },
    {
      provide: 'GetAlbumImageService2',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
    {
      provide: 'GetArtistImageService',
      useFactory: () => {
        return new GetFileService(process.env.ARTISTS_IMAGES_CONTAINER);
      },
    },
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
