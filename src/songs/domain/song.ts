import { ArtistID } from 'src/artists/domain/value-objects/artistID-valueobject';
import { SongAudioReference } from './value-objects/SongAudioReference-valueobject';
import { SongID } from './value-objects/SongID-valueobject';
import { SongImageReference } from './value-objects/SongImageReference-valueobject';
import { SongName } from './value-objects/SongName-valueobject';
import { SongCreationDate } from './value-objects/SongCreationDate-valueobject';
import { SongDuration } from './value-objects/SongDuration-valueobject';
import { SongStreams } from './value-objects/SongStreams-valueobject';
import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { DomainEvent } from 'src/common/domain/Event/domain-event';
import { SongCreatedEvent } from './event/SongCreatedEvent';

export class Song extends AggregateRoot<SongID> {
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
      case SongCreatedEvent:
        const songCreated = event as SongCreatedEvent;
        this.name = songCreated.name;
        this.duration = songCreated.duration;
        this.creation_date = songCreated.creation_date;
        this.songAudio_reference = songCreated.songAudio_reference;
        this.image_reference = songCreated.image_reference;
        this.streams = songCreated.streams;
        this.genres = songCreated.genres;
        this.artists = songCreated.artists;
        break;
      default:
        throw new Error('Event no fue implementado.');
    }
  }
  protected ensureValidState(): void {
    if (!this.name) throw new Error('Invalid Song Name');
    if (!this.duration) throw new Error('Invalid Song Duration');
    if (!this.creation_date) throw new Error('Invalid Song Creation Date');
    if (!this.songAudio_reference)
      throw new Error('Invalid Song Audio Reference');
    if (!this.image_reference) throw new Error('Invalid Song Image Reference');
    if (!this.streams) throw new Error('Invalid Song Streams');
    if (!this.genres) throw new Error('Invalid Song Genres');
    if (!this.artists) throw new Error('Invalid Song Artists');
    //Aqui deberiamos crear una excepcion para cada vaina 
    //pero me da ladill asi que lo puse asi
  }
  //private id: SongID; //vo
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

  // get Id(): string {
  //   return this.id.Value;
  // }
  get Name(): string {
    return this.name.Value;
  }
  get Duration() {
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
    const songCreated = SongCreatedEvent.create(
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
    super(id, songCreated);
    // this.id = id;
    // this.name = name;
    // this.duration = duration;
    // this.creation_date = creation_date;
    // this.songAudio_reference = songAudio_reference;
    // this.image_reference = image_reference;
    // this.streams = streams;
    // this.genres = genres;
    // this.artists = artists;
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
