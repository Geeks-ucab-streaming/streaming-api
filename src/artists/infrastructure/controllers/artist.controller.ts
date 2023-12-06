// import { Controller, Get, Inject, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
// import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
// import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
// import { Artist } from 'src/artists/domain/artist';

import { Controller, Get, Param } from '@nestjs/common';
import { OrmArtistRepository } from '../repositories/artist.repository.impl';
import { Result } from 'src/common/domain/logic/Result';
import {
  GetArtistProfilesApplicationService,
  GetArtistProfilesApplicationServiceDto,
} from 'src/artists/application/services/get-artist-profile.application.service';
import { Artist } from 'src/artists/domain/artist';
import { ArtistsMapper } from '../mappers/artist.mapper';
import { ErrorApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator';
import { LoggingApplicationServiceDecorator } from 'src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator';
import { NestLogger } from 'src/common/infrastructure/logger/nest-logger';
import { DataSourceSingleton } from 'src/core/infrastructure/dataSourceSingleton';
@Controller('artists')
export class ArtistController {
  private readonly ormArtistMapper: ArtistsMapper;
  private readonly ormArtistRepository: OrmArtistRepository;

  constructor() {
    this.ormArtistRepository = new OrmArtistRepository(
      DataSourceSingleton.getInstance(),
    );
    this.ormArtistMapper = new ArtistsMapper();
  }

  @Get('/:ArtistId')
  async getArtist(@Param('ArtistId') id): Promise<Result<Artist>> {
    const dto: GetArtistProfilesApplicationServiceDto = { id };
    // const service=new GetArtistProfilesApplicationServiceDto(this.ormArtistRepository);
    //Mapeamos y retornamos.

    //Ejecutamos el caso de uso
    //Creamos el servicio de aplicación.
    const service = new ErrorApplicationServiceDecorator(
      new LoggingApplicationServiceDecorator(
        new GetArtistProfilesApplicationService(this.ormArtistRepository),
        new NestLogger(),
      ),
    );
    const result = await service.execute(dto);
    return result;
  }
}

//   private findOneArtistService: FindOneArtistService;
//   private findAllArtistService: FindAllArtistService;
//   private findSongsByArtistIdService: GetSongByArtistId;
//   private readonly ormSongRepository: OrmArtistRepository;
//   constructor() {}

//   @Get()
//   async findAll(): Promise<Artist[]> {
//     return await this.findAllArtistService.execute();
//   }
//   @ApiTags('Artist')
//   @Get('/:id')
//   findById(@Param('id') id: string): Promise<Artist> {
//     return this.findOneArtistService.execute(id);
//   }
//   @ApiTags('Artist')
//   @Get('/ArtistsSongsByArtistId/:id')
//   findSongsById(@Param('id') id: string): Promise<any> {
//     return this.findSongsByArtistIdService.execute(id);
//   }
// }
