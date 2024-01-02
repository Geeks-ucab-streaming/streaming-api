import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { FindSongsByArtistIdService } from "src/songs/application/services/getSongsByArtist.service";
import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";
import { find } from "rxjs";

export class OMGetSongByArtistIdService {

    public static getdtoValid(): string {
      const dto= "1";

  
   return dto;
  
    }
  
    public static GetSongByArtistIdServicemock(): FindSongsByArtistIdService {
  
    
   const repo:Dummy_Songs_Repo= new Dummy_Songs_Repo();
  
  
  
  
      return new FindSongsByArtistIdService(repo);
    }
  
    public static GetArtistnotValid(): ArtistID {
  
        const dto: ArtistID= ArtistID.create("1");

  
   return dto;
  
  }
  
  }
  