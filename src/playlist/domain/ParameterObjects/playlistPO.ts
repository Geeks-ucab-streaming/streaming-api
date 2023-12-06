import { Song } from 'src/songs/domain/song';
import { Playlist } from '../playlist';
import { Artist } from 'src/artists/domain/artist';

export class PlaylistPO {
  playlist: Playlist;
  playlistSongs: Song[];
  playlistCreators: Artist[];

  constructor(
    playlist: Playlist,
    playlistSongs: Song[],
    playlistCreators: Artist[],
  ) {
    this.playlist = playlist;
    this.playlistSongs = playlistSongs;
    this.playlistCreators = playlistCreators;
  }
}
