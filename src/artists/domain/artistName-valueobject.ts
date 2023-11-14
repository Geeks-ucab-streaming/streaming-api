import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { Result } from "src/common/domain/logic/Result";

interface ArtistNameProps {
  value: string;
}

export class ArtistName extends ValueObject<ArtistNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ArtistNameProps) {
    super(props);
  }

  public static create(name: string): Result<ArtistName> {
    if (!!name === false || name.length === 0) {
      return Result.fail<ArtistName>('No puede contener un nombre vacio');
    } else {
      return Result.ok<ArtistName>(new ArtistName({ value: name }));
    }
  }
}
