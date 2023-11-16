import { Artist } from 'src/artists/domain/artist';
import { AggregateRoot } from 'src/common/domain/aggregate-root';
import { UniqueEntityID } from 'src/common/domain/unique-entity-id';

interface SongProps {
  name: string;
  duration: string;
  creation_date: Date;
  song_reference: string;
  preview_reference: string;
  image_reference: string;
  reproductions: number;
  genres: string[];
  artists: Artist[];
  songImage: Buffer | null;
}

export class Song extends AggregateRoot<SongProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(props: SongProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: SongProps, id: UniqueEntityID) {}
}
