import { GetSongsInCollectionService } from "src/songs/application/services/getSongsInCollection.service";
import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";

export class OMGetSongsInCollectionService {

public static getCollectionValid(): string[] {
  const dto= ["1","2"];

 
 return dto;



}

public static GetSongsInCollectionServicemock(): GetSongsInCollectionService {

const repo= new Dummy_Songs_Repo();


return new GetSongsInCollectionService(repo);
}

public static GetCollectionnotValid(): string[] {

    const dto=["-1"];

    return dto;
}

}