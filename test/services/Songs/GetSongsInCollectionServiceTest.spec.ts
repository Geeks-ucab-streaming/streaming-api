import { GetSongsInCollectionService } from "src/songs/application/services/getSongsInCollection.service";
import { OMGetSongsInCollectionService } from "../ObjectMother/OMGetSongsInCollectionServiceTest";


describe('GetSongsInCollectionService', () => {

    test('should return an array of songs by the id of a collection', async () => {
    //ARRANGE
    const dto = OMGetSongsInCollectionService.GetCollectionnotValid();
    const service:GetSongsInCollectionService= OMGetSongsInCollectionService.GetSongsInCollectionServicemock();
    
    //ACT
    const Result= await service.execute(dto);
    
    //ASSERT
    expect(Result).toBeTruthy() ;
    
    });
    });
    test('should return an error', async () => {
        const dto = OMGetSongsInCollectionService.GetCollectionnotValid();
        const service:GetSongsInCollectionService= OMGetSongsInCollectionService.GetSongsInCollectionServicemock();
        
        //ACT
        const Result= await service.execute(dto);
        
        //ASSERT
        expect(Result).toBeTruthy() ;
    });