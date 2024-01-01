import { Artist } from "src/artists/domain/artist";
import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { ISongRepository } from "src/songs/domain/ISongRepository";
import { Song } from "src/songs/domain/song";

export class Dummy_Songs_Repo implements ISongRepository{
    findByArtistId(id: string): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }
    findByPlaylistId(id: string): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }
    findSongsInCollection(ids: string[]): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Song> {

        const date = new Date("1995-12-17T03:24:00");
        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const genres:string[]=["Rock","Pop"];

        

        return Promise.resolve(Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,[artist1,artist2]));
    }
}