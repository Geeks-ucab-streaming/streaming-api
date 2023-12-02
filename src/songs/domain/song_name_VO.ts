import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class song_name_VO implements ValueObject<string> {

  private name:string;

  getValue(): string {
    return this.name;
  }

  equals(vo: this): boolean {
    return this.name === vo.name;
  }

  isValid(): boolean {
    return this.name !== null && this.name !== undefined;

  }

}