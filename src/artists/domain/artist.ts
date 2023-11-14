import { Entity } from "src/common/domain/Entity/entity";
import { UniqueEntityID } from "src/common/domain/unique-entity-id";
import { ArtistName } from "./artistName-valueobject";
import { Result } from "src/common/domain/logic/Result";
import { Guard } from "src/common/domain/logic/Guard";
import { ArtistImage } from "./artistImage-valueobject";

interface ArtistProps{
  name: ArtistName;
  image_reference: ArtistImage;
}
export class Artist extends Entity<ArtistProps> {
  name: string;
  image_reference: string;

  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(
    props: ArtistProps,
    id: UniqueEntityID,
  ) {
    super(props, id);
  }

  public static create(
    props: ArtistProps,
    id?: UniqueEntityID,
  ): Result<Artist> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.image_reference, argumentName: 'image_reference' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Artist>(guardResult.message);
    } else {
      return Result.ok<Artist>(
        new Artist(
          {
            ...props,
          },
          id,
        ),
      );
    }
  }
}

