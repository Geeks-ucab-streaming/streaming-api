import { GetSongByIdService } from "src/songs/application/services/getSongById.service";
import { OMGetSongByIdService } from "../ObjectMother/OMGetSongByIdService";
import { ISongRepository } from "src/songs/domain/ISongRepository";
import { Song } from "src/songs/domain/song";



describe('GetSongByIdService', () => {

test('should return a song', async () => {
//ARRANGE
const dto = OMGetSongByIdService.getdtoValid();
const service: GetSongByIdService= OMGetSongByIdService.GetSongByIdServicemock();

//ACT
const Result= await service.execute(dto);

//ASSERT
expect(dto).toBeTruthy();

});
});
test('should return an error', async () => {
//ARRANGE
const dto = OMGetSongByIdService.GedtonotValid
const service: GetSongByIdService= OMGetSongByIdService.GetSongByIdServicemock();

//ACT
const Result= await service.execute();

//ASSERT
expect(dto).toBeTruthy();


});