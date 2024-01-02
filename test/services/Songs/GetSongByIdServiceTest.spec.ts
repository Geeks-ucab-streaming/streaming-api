import { GetSongByIdService } from "src/songs/application/services/getSongById.service";
import { OMGetSongByIdService } from "../ObjectMother/OMGetSongByIdService";



describe('GetSongByIdService', () => {

test('should return a song by the id of a song', async () => {
//ARRANGE
const dto = OMGetSongByIdService.getdtoValid();
const service: GetSongByIdService= OMGetSongByIdService.GetSongByIdServicemock();

//ACT
const Result= await service.execute(dto);

//ASSERT
expect(Result.IsSuccess).toBeTruthy() ;

});
});
test('should return an error', async () => {
    //ARRANGE
    const dtoB = OMGetSongByIdService.GedtonotValid();
    const service: GetSongByIdService= OMGetSongByIdService.GetSongByIdServicemock();

    //ACT
    const Result= await service.execute(dtoB);

    //ASSERT
    expect(Result.IsSuccess).toBeTruthy() ;
});

