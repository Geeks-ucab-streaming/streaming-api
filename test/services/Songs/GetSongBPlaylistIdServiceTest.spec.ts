import { OMGetSongByPlaylistIdService } from "../ObjectMother/OMGetSongByPlaylistIdService";
import { GetSongBPlaylistIdService } from "src/songs/application/services/getSongsByPlaylistId.service";

describe('GetSongByPlaylistIdService', () => {

    test('should return an array of songs by the id of a playlist', async () => {
    //ARRANGE
    const dto = OMGetSongByPlaylistIdService.getplaylistValid();
    const service: GetSongBPlaylistIdService= OMGetSongByPlaylistIdService.GetSongByPlaylistIdServicemock();
    
    //ACT
    const Result= await service.execute(dto);
    
    //ASSERT
    expect(Result).toBeTruthy() ;
    
    });
    });
    test('should return an error', async () => {
        //ARRANGE
        const dto = OMGetSongByPlaylistIdService.GetplaylistnotValid();
    const service: GetSongBPlaylistIdService= OMGetSongByPlaylistIdService.GetSongByPlaylistIdServicemock();
    
    //ACT
    const Result= await service.execute(dto);
    
        //ASSERT
        expect(Result).toBeFalsy() ;
    });

