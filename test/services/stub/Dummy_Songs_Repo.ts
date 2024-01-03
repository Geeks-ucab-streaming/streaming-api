import { ArtistID } from "src/artists/domain/value-objects/artistID-valueobject";
import { Playlist } from "src/playlist/domain/playlist";
import { ISongRepository } from "src/songs/domain/ISongRepository";
import { Song } from "src/songs/domain/song";
import { SongID } from "src/songs/domain/value-objects/SongID-valueobject";
import { buffer } from "stream/consumers";
impor {collection}

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

        const buffer:Buffer=new Buffer(10);

        const date = new Date("1995-12-17T03:24:00");

        const artist1:ArtistID= ArtistID.create("1");
        const artist2:ArtistID= ArtistID.create("2");
        const artists:ArtistID[]=[artist1,artist2];

        const genres:string[]=["Rock","Pop"];

        const song1:Song=Song.create("1","Acidemia",69,date,"reference1","Diego Argotte enflusado",100,genres,artists);
        const song2:Song=Song.create("2","U2",83,date,"reference1","Carlos Alonzo enflusado",100,genres,[artist1,artist2]);

        const songs:SongID[]=[song1.Id,song2.Id];



        const playlist:Playlist=Playlist.create("1","Picowawa",100,"optra",1000,buffer,false,artists,songs);
        const playlistSong:Song[]=[song1,song2];

        if(id=="1"){

            return Promise.resolve(playlistSong);

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

        

        const collection: collectiom

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