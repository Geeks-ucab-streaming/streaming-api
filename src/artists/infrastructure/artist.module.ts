import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './artist.repository.impl';
import { FindArtistService } from '../application/services/find-artist.service';
import { GetArtistImageFileService } from 'src/common/infrastructure/services/getArtistImageFile.service';

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
      useClass: GetArtistImageFileService,
    },
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
