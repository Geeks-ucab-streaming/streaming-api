import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './artist.repository.impl';
import { FindArtistService } from '../application/services/find-artist.service';
import { GetImageFileService } from 'src/common/infrastructure/services/getImageFile.service';

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
      provide: 'IGetFileService',
      useClass: GetImageFileService,
    },
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
