import { SubscriptionEnum } from "../enums/subscriptionEnum";

export class userSuscriptionState {
    private suscriptionState: SubscriptionEnum;
    private _suscription_date: Date;

    constructor(suscriptionState: string, suscription_date?: Date) {
        this.suscriptionState = suscriptionState as SubscriptionEnum;
        this._suscription_date = suscription_date;
    }

    public get suscription_date(): Date {
        return this._suscription_date;
    }
    public set suscription_date(value: Date) {
        this._suscription_date = value;
    }

    public get SuscriptionState(): string {
        return this.suscriptionState;
    }

    public set SuscriptionState(suscriptionState: string) { 
        this.suscriptionState = suscriptionState as SubscriptionEnum;
    }

    static create(suscriptionState: string, subscriptionDate: Date): userSuscriptionState {
        return new userSuscriptionState(suscriptionState,subscriptionDate);
    }

    public equals(userSuscriptionState: userSuscriptionState): boolean {
        return this.suscriptionState === userSuscriptionState.suscriptionState;
    }
       
}