
import { FindSongsByArtistIdService } from "src/songs/application/services/getSongsByArtist.service";
import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";

export class OMGetSongByArtistIdService {

    public static getdtoValid(): string {
      const dto= "1";

  
   return dto;
  
    }
  
    public static GetSongByArtistIdServicemock(): FindSongsByArtistIdService {
  
    
   const repo:Dummy_Songs_Repo= new Dummy_Songs_Repo();
  
  
  
  
      return new FindSongsByArtistIdService(repo);
    }
  
    public static GetdtonotValid(): string {
  
        const dto="-1";

  
   return dto;
  
  }
  
  }
  