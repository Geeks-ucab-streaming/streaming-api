import { OMGetSongByArtistIdService } from "../ObjectMother/OMGetsongByArtistService";
import { FindSongsByArtistIdService } from "src/songs/application/services/getSongsByArtist.service";



describe('GetSongByIdService', () => {

test('should return a song by the id of an artist', async () => {
//ARRANGE
const dto = OMGetSongByArtistIdService.getdtoValid();
const service: FindSongsByArtistIdService= OMGetSongByArtistIdService.GetSongByArtistIdServicemock();

//ACT
const Result= await service.execute(dto);

//ASSERT
expect(Result.IsSuccess).toBeTruthy() ;

});
});
test('should return an error', async () => {
    //ARRANGE
    const dtoB = OMGetSongByArtistIdService.GetdtonotValid();
    const service: FindSongsByArtistIdService=OMGetSongByArtistIdService.GetSongByArtistIdServicemock();

    //ACT
    const Result= await service.execute(dtoB);

    //ASSERT
    expect(Result.IsSuccess).toBeFalsy() ;
});

