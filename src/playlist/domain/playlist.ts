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
  private id: PlaylistID;
  private name: PlaylistName;
  private duration: PlaylistDuration;
  private image_reference: PlaylistImageReference;
  private playlist_Image: Buffer | null;
  private streams: PlaylistStreams;
  private playlistCreator?: ArtistID[];
  private playlistSong?: SongID[];

  get Id(): string {
    return this.id.Value;
  }
  get Name(): string {
    return this.name.Value;
  }
  get Duration(): number {
    return this.duration.Value;
  }
  get Image_reference(): string {
    return this.image_reference.Value;
  }
  get Playlist_Image(): Buffer {
    return this.playlist_Image;
  }
  get Streams(): number {
    return this.streams.Value;
  }
  get PlaylistCreator(): string[] {
    let values: string[] = [];
    for (const id of this.playlistCreator) {
      values.push(id.Value);
    }
    return values;
  }
  get PlaylistSong(): string[] {
    let values: string[] = [];
    for (const id of this.playlistSong) {
      values.push(id.Value);
    }
    return values;
  }
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
    duration: number,
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
