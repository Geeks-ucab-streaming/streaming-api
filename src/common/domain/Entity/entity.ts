import { IValueObject } from "../ValueObjects/value-object.interface";

export abstract class Entity<T extends IValueObject<T>> {
  protected readonly id: T;
  constructor(id: T) {
    this.id = id;
  }

 public equals(vo:T): boolean {
    return this.id.equals(vo);
  }
}