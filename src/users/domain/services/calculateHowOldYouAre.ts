export class calculateHowOldYouAre {

    static ValidateYear(currentDate: Date): Date {
      const year=currentDate.getFullYear() - 100
      return new Date(year,1,1);
    }

}