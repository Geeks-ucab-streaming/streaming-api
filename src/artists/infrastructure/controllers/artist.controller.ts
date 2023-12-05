// import { Controller, Get, Inject, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { FindAllArtistService } from 'src/artists/application/services/FindAllArtist.service';
// import { FindOneArtistService } from 'src/artists/application/services/FindOneArtist.service';
// import { GetSongByArtistId } from 'src/artists/application/services/GetSongsByArtistId.service';
// import { Artist } from 'src/artists/domain/artist';

import { Body, Controller, Get } from "@nestjs/common";
import { OrmArtistRepository } from "../repositories/artist.repository.impl";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterArtistApplicationServiceDto } from "src/artists/application/services/register-artist.application.service";
import { CreateUserDto } from "src/users/application/dtos/create-user.dto";
import { Result } from "src/common/domain/logic/Result";
import { Post } from '@nestjs/common';
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { ArtistEntity } from "../entities/artist.entity";
import { GetArtistProfilesApplicationService, GetArtistProfilesApplicationServiceDto } from "src/artists/application/services/get-artist-profile.application.service";
import { GetArtistId } from "../get-artist-id.decorator";
import { ResultMapper } from "src/common/Application/result-handler/result.mapper";
import { Artist } from "src/artists/domain/artist";
import { ArtistsMapper } from "../mappers/artist.mapper";
import { ErrorApplicationServiceDecorator } from "src/common/Application/application-service/decorators/error-decorator/error-application.service.decorator";
import { LoggingApplicationServiceDecorator } from "src/common/Application/application-service/decorators/error-decorator/loggin-application.service.decorator";
import { NestLogger } from "src/common/infrastructure/logger/nest-logger";
@Controller('artists')
export class ArtistController {
      private readonly ormArtistMapper: ArtistsMapper;
constructor(
    @InjectRepository(OrmArtistRepository)
    private readonly ormArtistRepository: OrmArtistRepository
) {}

@Get('GetArtist')
async getArtist(@GetArtistId() id):Promise<Result<ArtistEntity>>{ 
    const dto: GetArtistProfilesApplicationServiceDto = {id};
   // const service=new GetArtistProfilesApplicationServiceDto(this.ormArtistRepository);
        //Mapeamos y retornamos.
       
        //Ejecutamos el caso de uso
                //Creamos el servicio de aplicación.
        const service = new ErrorApplicationServiceDecorator(
                new LoggingApplicationServiceDecorator(
                new GetArtistProfilesApplicationService(this.ormArtistRepository),
                new NestLogger()
            )
        );
        const result = (await service.execute(dto));
        return ResultMapper.map(
            result,
            (value: Artist) => {
                return this.ormArtistMapper.domainTo(value)
            }
        );
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
}
