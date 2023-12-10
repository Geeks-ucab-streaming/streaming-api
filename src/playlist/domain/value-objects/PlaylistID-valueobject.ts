import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';

export class PlaylistID implements IValueObject<PlaylistID> {
  private readonly value: string;

  get Value(): string {
    return this.value;
  }

  private constructor(value: string) {
    if (this.checkUUID(value)) this.value = value;
    else throw new Error('El id no es un UUID');
  }

  public static create(value: string): PlaylistID {
    return new PlaylistID(value);
  }

  public equals(other: PlaylistID): boolean {
    return this.value === other.value;
  }

  private checkUUID(value: string) {
    const UUID_FORMAT =
      /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;
    return value.match(UUID_FORMAT);
  }
}
