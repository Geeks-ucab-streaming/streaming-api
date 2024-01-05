import { GetTrendingSongsService } from "src/songs/application/services/getTrendingSongs.service";
import { OMGetTrendingSongsService } from "../ObjectMother/OMGetTrendingSongsService";

describe('GetSongByArtistIdService', () => {

    test('should return trendings songs', async () => {
    //ARRANGE
    const service: GetTrendingSongsService= OMGetTrendingSongsService.GetTrendingSongsServicemock();
    
    //ACT
    const Result= await service.execute();
    
    //ASSERT
    expect(Result.IsSuccess).toBeTruthy() ;
    
    });
    test('should return an error', async () => {
    //ARRANGE
        const service: GetTrendingSongsService= OMGetTrendingSongsService.GetTrendingSongsServicenullmock();
    
    //ACT
    const Result= await service.execute();
    
    //ASSERT
    expect(Result.IsSuccess).toBeTruthy() ;
    });
    });
    