import { Factory } from 'src/common/domain/icreator.interface';/*
import { Song } from '../domain/song';
import { SongEntity } from './entities/song.entity';
export class SongFactory implements Factory<SongEntity, Song> {
  factoryMethod(songResponse: SongEntity): Song {
    console.log(songResponse);
    return new Song(
      songResponse.id,
      songResponse.name,
      songResponse.duration,
      songResponse.creation_date,
      songResponse.song_reference,
      songResponse.preview_reference,
      songResponse.image_reference,
      songResponse.reproductions,
      songResponse.genres,
      this.operation(songResponse),
    );
  }

  private operation(songResponse: SongEntity): string[] {
    let artists: string[] = [];
    songResponse.song_artist.map((artist_song) => {
      artists.push(artist_song.artist.name);
    });
    return artists;
  }
}
*/