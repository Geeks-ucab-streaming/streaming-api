import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class userName implements IValueObject<userName> {
  static create(name: string): userName {
    return new userName(name);
  }
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  create(name: string): userName {
    return new userName(name);
  }

  public get Name(): string {
    return this.name;
  }

  public equals(username: userName): boolean {
    return this.name === username.name;
  }

}