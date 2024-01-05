import { GetSongByIdService } from 'src/songs/application/services/getSongById.service';
import { GetSongByIdServiceDto } from 'src/songs/application/services/getSongById.service';
import { Dummy_Songs_Repo } from '../stub/Dummy_Songs_Repo';


export class OMGetSongByIdService {

  public static getdtoValid(): GetSongByIdServiceDto {
    const dto: GetSongByIdServiceDto = {};
 dto.id="1";

 return dto;

  }

  public static GetSongByIdServicemock(): GetSongByIdService {

  
 const repo:Dummy_Songs_Repo= new Dummy_Songs_Repo();




    return new GetSongByIdService(repo);
  }

  public static GedtonotValid(): GetSongByIdServiceDto {

    const dto: GetSongByIdServiceDto = {};
 dto.id="-11";

 return dto;

}

}
