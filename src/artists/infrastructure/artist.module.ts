import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './repositories/artist.repository.impl';
import { FindOneArtistService } from '../application/services/FindOneArtist.service';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { FindAllArtistService } from '../application/services/FindAllArtist.service';
import { FindSongsByArtistIdService } from 'src/songs/application/services/getSongsByArtistId.service';
import { SongsByArtistIdRepository } from '../../songs/infrastructure/repositories/songsByArtistRepository';
import { SongEntity } from 'src/songs/infrastructure/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, SongEntity])],
  providers: [
    {
      provide: 'GetSongImageService',
      useFactory: () => {
        return new GetFileService(process.env.SONG_ALBUM_PLAYLIST_CONTAINER);
      },
    },
    {
      provide: 'IGenericRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'SongsByArtistIdRepository',
      useClass: SongsByArtistIdRepository,
    },
    {
      provide: 'FindOneArtistService',
      useClass: FindOneArtistService,
    },
    {
      provide: 'FindSongsByArtistIdService',
      useClass: FindSongsByArtistIdService,
    },
    {
      provide: 'FindAllArtistService',
      useClass: FindAllArtistService,
    },
    {
      provide: 'GetArtistImageService',
      useFactory: () => {
        return new GetFileService(process.env.ARTISTS_IMAGES_CONTAINER);
      },
    },
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
