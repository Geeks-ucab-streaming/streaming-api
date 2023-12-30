export class calculateDaysToEndSubscription {
    static daysToEndSubscription(subDate: Date): number {

      const subscriptionEndDate = new Date(subDate);

      const currentDate = new Date();

      // @ts-ignore
      const differenceInMilliseconds = currentDate - subscriptionEndDate ;

      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

      return Math.floor(differenceInDays);
    }
}