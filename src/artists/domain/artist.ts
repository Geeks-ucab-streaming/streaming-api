import { ArtistName } from './value-objects/artistName-valueobject';
import { ArtistImage } from './value-objects/artistImage-valueobject';
import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { ArtistID } from './value-objects/artistID-valueobject';
import { ArtistCreatedEvent } from './events/artist-created-event';
import { DomainEvent } from 'src/common/domain/Event/domain-event';
import { InvalidArtistImageException } from './exceptions/invalid-artist.exception';
import { error } from 'console';
import { InvalidArtistNameException } from './exceptions/invalid-artist-name.exception';
import { ArtistStreams } from './value-objects/artistStreams-valueobject';

export class Artist extends AggregateRoot<ArtistID> {
  private name: ArtistName;
  private image_reference: ArtistImage;
  private image: Buffer | null;
  private streams: ArtistStreams;

  //getters
  get Name(): ArtistName {
    return this.name;
  }
  get ImageReference(): ArtistImage {
    return this.image_reference;
  }
  get Image(): Buffer | null {
    return this.image;
  }
  get Streams(): number {
    return this.streams.Value;
  }
  public setImage(image: Buffer) {
    this.image = image;
  }
  protected constructor(
    id: ArtistID,
    name: ArtistName,
    image_reference: ArtistImage,
    streams: ArtistStreams,
  ) {
    const artistCreated = ArtistCreatedEvent.create(
      id,
      name,
      image_reference,
      streams,
    );
    super(id, artistCreated);
  }

  //asignando estado
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
      case ArtistCreatedEvent:
        const artistCreated = event as ArtistCreatedEvent;
        this.name = artistCreated.name;
        this.image_reference = artistCreated.image_reference;
        this.streams = artistCreated.streams;
        break;
      default:
        throw new Error('Event no fue implementado.');
    }
  }

  //validando estado
  protected ensureValidState(): void {
    if (!this.name) throw new InvalidArtistNameException(this.name);
    if (!this.image_reference)
      throw new InvalidArtistImageException(this.image_reference);
  }

  public static create(
    id: ArtistID,
    name: ArtistName,
    image_reference: ArtistImage,
    streams: ArtistStreams,
  ): Artist {
    return new Artist(id, name, image_reference, streams);
  }
}
