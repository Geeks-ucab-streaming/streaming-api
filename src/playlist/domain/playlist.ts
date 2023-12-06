import { Artist } from 'src/artists/domain/artist';
import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { Song } from 'src/songs/domain/song';
import { SongID } from 'src/songs/domain/value-objects/SongID-valueobject';
import { PlaylistID } from './value-objects/PlaylistID-valueobject';
import { PlaylistName } from './value-objects/PlaylistName-valueobject';
import { PlaylistImageReference } from './value-objects/PlaylistImageReference-valueobject';
import { PlaylistStreams } from './value-objects/PlaylistStreams-valueobject';
import { PlaylistDuration } from './value-objects/PlaylistDuration-valueobject';

export class Playlist {
  public id: PlaylistID;
  public name: PlaylistName;
  public duration: PlaylistDuration;
  public image_reference: PlaylistImageReference;
  public playlist_Image: Buffer | null;
  public streams: PlaylistStreams;
  public playlistCreator?: ArtistID[];
  public playlistSong?: SongID[];
  protected constructor(
    id: PlaylistID,
    name: PlaylistName,
    duration: PlaylistDuration,
    image_reference: PlaylistImageReference,
    streams: PlaylistStreams,
    playlist_Image: Buffer | null,
    playlistCreators?: ArtistID[],
    playlistSongs?: SongID[],
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image_reference = image_reference;
    this.streams = streams;
    this.playlist_Image = playlist_Image;
    this.playlistCreator = playlistCreators || [];
    this.playlistSong = playlistSongs || [];
  }

  public static create(
    id: string,
    name: string,
    duration: string,
    image_reference: string,
    streams: number,
    playlistImage: Buffer,
    playlistCreators?: ArtistID[],
    playlistSongs?: SongID[],
  ) {
    return new Playlist(
      PlaylistID.create(id),
      PlaylistName.create(name),
      PlaylistDuration.create(duration),
      PlaylistImageReference.create(image_reference),
      PlaylistStreams.create(streams),
      playlistImage,
      playlistCreators,
      playlistSongs,
    );
  }
}
