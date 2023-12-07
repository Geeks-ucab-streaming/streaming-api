export class calculateHowYoungYouAre {

  static ValidateYear(birthDate: Date): Date {
   return new Date(birthDate.getFullYear() - 8,1,1);
 }

}