import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './artist.repository.impl';
import { FindOneArtistService } from '../application/services/FindOneArtist.service';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';
import { FindAllArtistService } from '../application/services/FindAllArtist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [
    {
      provide: 'IGenericRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'FindOneArtistService',
      useClass: FindOneArtistService,
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
