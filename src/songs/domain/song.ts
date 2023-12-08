import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongAudioReference } from './value-objects/SongAudioReference-valueobject';
import { SongID } from './value-objects/SongID-valueobject';
import { SongImageReference } from './value-objects/SongImageReference-valueobject';
import { SongName } from './value-objects/SongName-valueobject';
import { SongCreationDate } from './value-objects/SongCreationDate-valueobject';
import { SongDuration } from './value-objects/SongDuration-valueobject';
import { SongStreams } from './value-objects/SongStreams-valueobject';

export class Song {
  private id: SongID; //vo
  private name: SongName; //vo
  private duration: SongDuration; //vo
  private creation_date: SongCreationDate; //vo
  private songAudio_reference: SongAudioReference; //vo
  private image_reference: SongImageReference; //vo
  private streams: SongStreams;
  private genres: string[];
  private artists: ArtistID[]; //ArtistID VO
  private songImage: Buffer | null;

  get Genres(): string[] {
    return this.genres;
  }

  get Id(): string {
    return this.id.Value;
  }
  get Name(): string {
    return this.name.Value;
  }
  get Duration(): number {
    return this.duration.Value;
  }
  get CreationDate(): Date {
    return this.creation_date.Value;
  }
  get AudioReference(): string {
    return this.songAudio_reference.Value;
  }
  get ImageReference(): string {
    return this.image_reference.Value;
  }
  get Streams(): Number {
    return this.streams.Value;
  }
  get Artists(): string[] {
    let values: string[] = [];
    for (const id of this.artists) {
      values.push(id.Value);
    }
    return values;
  }

  get Image(): Buffer {
    return this.songImage;
  }

  set Image(image: Buffer) {
    this.songImage = image;
  }

  protected constructor(
    id: SongID,
    name: SongName,
    duration: SongDuration,
    creation_date: SongCreationDate,
    songAudio_reference: SongAudioReference,
    image_reference: SongImageReference,
    streams: SongStreams,
    genres: string[],
    artists: ArtistID[],
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.creation_date = creation_date;
    this.songAudio_reference = songAudio_reference;
    this.image_reference = image_reference;
    this.streams = streams;
    this.genres = genres;
    this.artists = artists;
  }

  public static create(
    id: string,
    name: string,
    duration: number,
    creation_date: Date,
    songAudio_reference: string,
    image_reference: string,
    streams: number,
    genres: string[],
    artists: ArtistID[],
  ): Song {
    return new Song(
      SongID.create(id),
      SongName.create(name),
      SongDuration.create(duration),
      SongCreationDate.create(creation_date),
      SongAudioReference.create(songAudio_reference),
      SongImageReference.create(image_reference),
      SongStreams.create(streams),
      genres,
      artists,
    );
  }
}
