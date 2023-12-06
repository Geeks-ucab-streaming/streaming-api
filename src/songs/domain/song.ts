import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongAudioReference } from './value-objects/SongAudioReference-valueobject';
import { SongID } from './value-objects/SongID-valueobject';
import { SongImageReference } from './value-objects/SongImageReference-valueobject';
import { SongName } from './value-objects/SongName-valueobject';
import { SongCreationDate } from './value-objects/SongCreationDate-valueobject';
import { SongDuration } from './value-objects/SongDuration-valueobject';
import { SongStreams } from './value-objects/SongStreams-valueobject';

export class Song {
  public id: SongID; //vo
  public name: SongName; //vo
  public duration: SongDuration; //vo
  public creation_date: SongCreationDate; //vo
  public songAudio_reference: SongAudioReference; //vo
  public image_reference: SongImageReference; //vo
  public streams: SongStreams;
  public genres: string[];
  public artists: ArtistID[]; //ArtistID VO
  public songImage: Buffer | null;

  get Genres(): string[] {
    return this.genres;
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
    duration: string,
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
