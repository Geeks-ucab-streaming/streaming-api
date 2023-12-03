import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

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
        return this.birthDate === userBirthDate.getBirthDate();
    }

    validateOldRangeBirthDate(birthDate: Date, yearBirthUser:number): boolean {
        if ((birthDate.getDate >= new Date(yearBirthUser,1,1).getDate)) {
            return true; //Retorna true si la fecha de nacimiento es válida en el rango establecido
        }
        return false;
    }

    validateYoungRangeBirthDate(birthDate: Date, yearBirthUser:number): boolean {
        if (birthDate.getDate <= new Date(yearBirthUser,1,1).getDate) {
            return true; //Retorna true si la fecha de nacimiento es válida en el rango establecido
        }
        return false;
    }
}