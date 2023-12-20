import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class UserGender implements IValueObject<UserGender> {
  private userGender: string;
  
  constructor(userGender: string) {
    this.userGender = userGender;
  }

  public get Gender(): string {
    return this.userGender;
  }

  static create (userGender: string): UserGender {
    return new UserGender(userGender);
  }

  public equals(userGender: UserGender): boolean {
    return this.userGender === userGender.userGender;
  }

  public checkGender (userGender: string): boolean {
    if (userGender === 'F' || userGender === 'M') {
      return true; //El Género es válido
    }
    return false;
  }

}