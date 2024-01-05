import { GetTrendingSongsService } from "src/songs/application/services/getTrendingSongs.service";
import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";

export class OMGetTrendingSongsService{

    public static GetTrendingSongsServicemock(): GetTrendingSongsService {

        const repo= new Dummy_Songs_Repo();
        
        
        return new GetTrendingSongsService(repo);
        }

        public static GetTrendingSongsServicenullmock(): GetTrendingSongsService {

            const repo= new Dummy_Songs_Repo();
            
            
            return new GetTrendingSongsService(null);
            }


}