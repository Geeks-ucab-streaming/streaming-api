import { Artist } from 'src/artists/domain/artist';
import { SongAudioReference } from '../value-objects/SongAudioReference-valueobject';
import { SongCreationDate } from '../value-objects/SongCreationDate-valueobject';
import { SongDuration } from '../value-objects/SongDuration-valueobject';
import { SongID } from '../value-objects/SongID-valueobject';
import { SongImageReference } from '../value-objects/SongImageReference-valueobject';
import { SongName } from '../value-objects/SongName-valueobject';
import { SongStreams } from '../value-objects/SongStreams-valueobject';

export class SongWithArtistPO {
  public id: SongID; //vo
  public name: SongName; //vo
  public duration: SongDuration; //vo
  public creation_date: SongCreationDate; //vo
  public songAudio_reference: SongAudioReference; //vo
  public image_reference: SongImageReference; //vo
  public streams: SongStreams;
  public genres: string[];
  public artists: Artist[]; //ArtistID VO
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
    artists: Artist[],
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
    id: SongID,
    name: SongName,
    duration: SongDuration,
    creation_date: SongCreationDate,
    songAudio_reference: SongAudioReference,
    image_reference: SongImageReference,
    streams: SongStreams,
    genres: string[],
    artists: Artist[],
  ): SongWithArtistPO {
    return new SongWithArtistPO(
      id,
      name,
      duration,
      creation_date,
      songAudio_reference,
      image_reference,
      streams,
      genres,
      artists,
    );
  }
}
