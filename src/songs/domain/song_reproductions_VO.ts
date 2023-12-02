import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class song_reproductions implements ValueObject<number> {

  private reproductions: number;

  getValue(): number {
    return this.reproductions;
  }

  equals(vo: this): boolean {
    return this.reproductions === vo.reproductions;
  }

  isValid(): boolean {
    return this.reproductions !== null && this.reproductions !== undefined;

  }

}