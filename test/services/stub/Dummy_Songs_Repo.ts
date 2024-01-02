import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { ISongRepository } from "src/songs/domain/ISongRepository";
import { Song } from "src/songs/domain/song";

export class Dummy_Songs_Repo implements ISongRepository{
    findByArtistId(id: string): Promise<Song[]> {
        const date = new Date("1995-12-17T03:24:00");
        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const genres:string[]=["Rock","Pop"];

        const songs:Song[]=[Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,[artist1,artist2])];

        if(id=="1"){

            return Promise.resolve(songs);

        }
        else{

            throw new Error("Song not found");

        }
    }
    findByPlaylistId(id: string): Promise<Song[]> {
        const date = new Date("1995-12-17T03:24:00");
        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const genres:string[]=["Rock","Pop"];

        const songs:Song[]=[Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,[artist1,artist2])];

        if(id=="1"){

            return Promise.resolve(songs);

        }
        else{

            throw new Error("Song not found");

        }

    }
    findSongsInCollection(ids: string[]): Promise<Song[]> {
        const date = new Date("1995-12-17T03:24:00");
        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const genres:string[]=["Rock","Pop"];

        const songs:Song[]=[Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,[artist1,artist2])];

        return Promise.resolve(songs);
        /*if(ids == ["1"]){

            return Promise.resolve(songs);

        }
        else{

            throw new Error("Song not found");

        }*/
    }
    findById(id: string): Promise<Song> {

        const date = new Date("1995-12-17T03:24:00");
        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const genres:string[]=["Rock","Pop"];

        

        return Promise.resolve(Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,[artist1,artist2]));
    }
}