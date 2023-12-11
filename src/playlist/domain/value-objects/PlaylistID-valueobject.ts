import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistID implements IValueObject<PlaylistID> {
  private readonly id: string;

  public get(): string {
    return this.id;
  }

  private constructor(id: string) {
    if (this.checkUUID(id)) this.id = id;
    else throw new Error('El id no es un UUID');
  }

  public static create(id: string): PlaylistID {
    return new PlaylistID(id);
  }

  public equals(other: PlaylistID): boolean {
    return this.id === other.id;
  }

  private checkUUID(id: string) {
    const UUID_FORMAT =
      /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;
    return id.match(UUID_FORMAT);
  }
}
