import { BrowseSongsService } from "src/songs/application/services/browseSongs.service";
import { OMBrowseSongsService } from "../ObjectMother/OMBrowseSongsService";

describe('GetSongByPlaylistIdService', () => {

    test('should return an array of songs by the id of a playlist', async () => {
    //ARRANGE
    const dto = OMBrowseSongsService.getdtoValid();
    const service:BrowseSongsService= OMBrowseSongsService.BrowseSongsServicemock();
    
    //ACT
    const Result= await service.execute(dto);
    
    //ASSERT
    expect(Result.IsSuccess).toBeTruthy() ;   
    });

    test('should return an array of songs by the id of a playlist', async () => {
        //ARRANGE
        const dto = OMBrowseSongsService.getdtoValid();
        const service:BrowseSongsService= OMBrowseSongsService.BrowseSongsServicemock();
        
        //ACT
        const Result= await service.execute(dto);
        
        //ASSERT
        expect(Result.IsSuccess).toBeTruthy() ;   
        });

});