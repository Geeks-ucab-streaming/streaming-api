import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { calculateHowOldYouAre } from "../../services/calculateHowOldYouAre";
import { calculateHowYoungYouAre } from "../../services/calculateHowYoungYouAre";

export class UserBirthDate implements IValueObject<UserBirthDate> {
private birthDate: Date;

  constructor(birthDate: Date, birthYearUser:number) {  
    if (!this.validateOldRangeBirthDate(birthDate, birthYearUser) && !this.validateYoungRangeBirthDate(birthDate, birthYearUser)) {
      throw new Error('Birth date is not valid');
    }
    else
    this.birthDate = birthDate;
    }

    getBirthDate() {
        return this.birthDate;
    }

    public equals(userBirthDate: UserBirthDate): boolean {
        return this.birthDate === userBirthDate.birthDate;
    }

    static create(birth_date: Date, year_birth_date: number): UserBirthDate {
      return new UserBirthDate(birth_date, year_birth_date);
    }

    validateOldRangeBirthDate(birthDate: Date, yearBirthUser:number): boolean {
        if (birthDate <= calculateHowOldYouAre.ValidateYear(birthDate)) {
            return true; //Retorna true si la fecha de nacimiento es válida en el rango establecido
        }
        return false;
    }

    validateYoungRangeBirthDate(birthDate: Date, yearBirthUser:number): boolean {
        if (birthDate >= calculateHowYoungYouAre.ValidateYear(birthDate)) {
            return true; //Retorna true si la fecha de nacimiento es válida en el rango establecido
        }
        return false;
    }
}