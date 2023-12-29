export class calculateDaysToEndSubscription {
    static daysToEndSubscription(subDate: Date): void {

      const subscriptionEndDate = new Date(subDate);

      const currentDate = new Date();

    

      // @ts-ignore
      const differenceInMilliseconds = currentDate - subscriptionEndDate ;

      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

      if (differenceInDays <=30 || differenceInDays <=31){

        return console.log('Su suscripcion se vencera en ' + differenceInDays + ' dias');
      }
      else{
        return console.log('Su suscripcion se vencera en ' + differenceInDays/30 + 'meses');
      }
    }
}

