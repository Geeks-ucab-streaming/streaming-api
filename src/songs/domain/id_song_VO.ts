import { ValueObject} from "src/common/domain/ValueObjects/value-object.interface";

export class Idsong implements ValueObject<number> {

  private id:number;

  getValue(): number {
    return this.id;
  }

  equals(vo: this): boolean {
    return this.id === vo.id;
  }

  isValid(): boolean {
    return this.id !== null && this.id !== undefined;

  }

}