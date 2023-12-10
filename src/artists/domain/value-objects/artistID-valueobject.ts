import { IValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
const UUID_FORMAT =
  /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;

export class ArtistID implements IValueObject<ArtistID> {
  private readonly id: string;

  get Value(): string {
    return this.id;
  }

  private constructor(id: string) {
    if (id && id.match(UUID_FORMAT)) {
      this.id = id;
    } else {
      //throw new InvalidPatientIdException();
    }
  }

  public static create(id: string): ArtistID {
    return new ArtistID(id);
  }

  public equals(other: ArtistID): boolean {
    return this.Value === other.Value;
  }
}
