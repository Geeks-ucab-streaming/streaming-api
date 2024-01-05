import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";
import { BrowseSongsService } from "src/songs/application/services/browseSongs.service";

export class OMBrowseSongsService{

public static getdtoValid(): string {

return "Juanito Alimaña";   
}

public static BrowseSongsServicemock(): BrowseSongsService {

    const repo= new Dummy_Songs_Repo();
    
    
    return new BrowseSongsService(repo);
    }

public getdtonotValid(): string {

return "juanito";
}

}