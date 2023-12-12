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
  private isAlbum: boolean;
  private playlistCreator?: ArtistID[];
  private playlistSong?: SongID[];

  get Id(): string {
    return this.id.Value;
  }
  get IsAlbum(): boolean {
    return this.isAlbum;
  }
  get Name(): string {
    return this.name.Value;
  }
  get Duration(): number {
    return this.duration.Value;
  }
  get DurationString(): string {
    let stringTime: string = '';
    let mins: number = 0;
    let hours: number = 0;
    let seconds: number = this.duration.Value;

    // Calcular horas
    if (seconds >= 3600) {
      hours = Math.floor(seconds / 3600);
      seconds %= 3600;
    }

    // Calcular minutos
    if (seconds >= 60) {
      mins = Math.floor(seconds / 60);
      seconds %= 60;
    }

    // Formatear el tiempo en una cadena
    stringTime = `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return stringTime;
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
  public setDuration(duration: number) {
    this.duration = PlaylistDuration.create(duration);
  }
  protected constructor(
    id: PlaylistID,
    name: PlaylistName,
    duration: PlaylistDuration,
    image_reference: PlaylistImageReference,
    streams: PlaylistStreams,
    isAlbum: boolean,
    playlist_Image: Buffer | null,
    playlistCreators?: ArtistID[],
    playlistSongs?: SongID[],
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image_reference = image_reference;
    this.streams = streams;
    this.isAlbum = isAlbum;
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
    isAlbum: boolean,
    playlistCreators?: ArtistID[],
    playlistSongs?: SongID[],
  ) {
    return new Playlist(
      PlaylistID.create(id),
      PlaylistName.create(name),
      PlaylistDuration.create(duration),
      PlaylistImageReference.create(image_reference),
      PlaylistStreams.create(streams),
      isAlbum,
      playlistImage,
      playlistCreators,
      playlistSongs,
    );
  }
}
