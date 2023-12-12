import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class Line implements IValueObject<Line>{
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(id:string,phone:string): Line {
    return new Line(id,phone);
  }

  public equals(phoneLine: Line): boolean {
    return this.name === phoneLine.name;
  }
  
}
