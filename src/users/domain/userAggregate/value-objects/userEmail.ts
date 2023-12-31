import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class userEmail implements IValueObject<userEmail> {
  
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  static create(email: string): userEmail {
    return new userEmail(email);
  }

  public get Email(): string {
    return this.email;
  }

  public equals(userEmail: userEmail): boolean {
    return this.email === userEmail.email;
  }

}