import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './artist.repository.impl';
import { FindArtistService } from '../application/services/find-artist.service';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [
    {
      provide: 'IGenericRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'IFindGenericService',
      useClass: FindArtistService,
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
