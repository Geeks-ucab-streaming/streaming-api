import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from '../application/services/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepositoryImpl } from './artist.repository.impl';
import { FindArtistService } from '../application/services/find-artist.service';
import { GetImageFileService } from 'src/common/infrastructure/services/getImageFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [
    ArtistService,
    {
      provide: 'ArtistRepository',
      useClass: ArtistRepositoryImpl,
    },
    {
      provide: 'IArtistService',
      useClass: ArtistService,
    },
    {
      provide: 'IFindGenericService',
      useClass: FindArtistService,
    },
    {
      provide: 'IGetFileService',
      useClass: GetImageFileService,
    },
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
