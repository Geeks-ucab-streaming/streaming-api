export class calculateHowYoungYouAre {

  static ValidateYear(currentDate: Date): Date {
   return new Date(currentDate.getFullYear() - 8,1,1);
 }

}