import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class UserBirthDate implements IValueObject<UserBirthDate> {
private birthDate: Date;

  constructor(birthDate: Date, birthYearUser:number) {  
    this.birthDate = birthDate;
    }

    get BirthDate() {
        return this.birthDate;
    }

    public equals(userBirthDate: UserBirthDate): boolean {
        return this.birthDate === userBirthDate.birthDate;
    }

    static create(birth_date: Date, year_birth_date: number): UserBirthDate {
      return new UserBirthDate(birth_date, year_birth_date);
    }   
}