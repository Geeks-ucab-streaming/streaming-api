import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class creation_date_song implements ValueObject<Date> {

  private creation: Date;

  getValue(): Date {
    return this.creation;
  }

  equals(vo: this): boolean {
    return this.creation === vo.creation;
  }

  isValid(): boolean {
    return this.creation !== null && this.creation !== undefined;

  }

}