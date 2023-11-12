import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from '../application/services/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepositoryImpl } from './artist.repository.impl';
import { FindArtistService } from '../application/services/find-artist.service';
import { GetFileService } from 'src/common/infrastructure/services/getFile.service';

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
      useClass: GetFileService,
    }
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
