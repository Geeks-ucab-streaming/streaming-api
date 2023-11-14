import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { SongEntity } from './entities/song.entity';
import { SongRepository } from './song.repository.impl';
import { SongsController } from './controllers/song.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SongEntity])],
  providers: [
    {
      provide: 'IGenericRepository',
      useClass: SongRepository,
    },

    {
      provide: 'GetSongImageService',
      useFactory: () => {
        return new GetFileService(process.env.ARTISTS_IMAGES_CONTAINER);
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
  ],
  controllers: [SongsController],
})
export class ArtistModule {}
