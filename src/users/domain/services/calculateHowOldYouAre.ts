export class calculateHowOldYouAre {

    static ValidateYear(birthDate: Date): Date {
      return new Date(2023 - birthDate.getFullYear(),1,1);
    }

}