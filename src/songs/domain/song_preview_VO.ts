import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class song_preview implements ValueObject<string> {

private preview:string;

getValue(): string {
    return this.preview;
  }

    equals(vo: this): boolean {
        return this.preview === vo.preview;
    }

    isValid(): boolean {
        return this.preview !== null && this.preview !== undefined;
    }
}