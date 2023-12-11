export class calculateHowYoungYouAre {

  ValidateYear(birthDate: Date): number {
   return birthDate.getFullYear() - 8;
 }

}