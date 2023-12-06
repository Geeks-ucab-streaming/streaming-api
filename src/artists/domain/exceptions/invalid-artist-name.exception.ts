import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { ArtistName } from "../value-objects/artistName-valueobject";
export class InvalidArtistNameException extends DomainException<ArtistName> {
  constructor(artistName: ArtistName) {
    super(artistName, 'Invalid Name', 'InvalidArtistNameException', 400);
  }
}
