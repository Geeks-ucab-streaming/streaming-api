import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class song_genres implements ValueObject<string[]> {

private genres:string[];

getValue(): string[] {
    return this.genres;
  }

equals(vo: this): boolean {
    return this.genres === vo.genres;
}

isValid(): boolean {
    return this.genres !== null && this.genres !== undefined;

}

}