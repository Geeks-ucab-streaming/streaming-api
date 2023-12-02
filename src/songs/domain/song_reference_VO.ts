import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class song_reference implements ValueObject<string> {

  private reference: string;

  getValue(): string {
    return this.reference;
  }

  equals(vo: this): boolean {
    return this.reference === vo.reference;
  }

  isValid(): boolean {
    return this.reference !== null && this.reference !== undefined;

  }

}