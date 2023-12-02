import { Artist } from 'src/artists/domain/artist';
import { Song } from 'src/songs/domain/song';

export class Playlist {
  id: string;
  name: string;
  duration: string;
  image_reference: string;
  playlist_Image: Buffer | null;
  reproductions: number;
  playlistCreator?: Artist[] | null;
  playlistSong?: Song[] | null;
  constructor(
    id: string,
    name: string,
    duration: string,
    image_reference: string,
    reproductions: number,
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image_reference = image_reference;
    this.reproductions = reproductions;
    this.playlistCreator = [];
    this.playlistSong = [];
  }
}
