import { SubscriptionEnum } from "../enums/subscriptionEnum";

export class userSuscriptionState {
    static create(suscriptionState: string): userSuscriptionState {
        return new userSuscriptionState(suscriptionState);
    }

    private suscriptionState: SubscriptionEnum;
    private _suscription_date: Date;

    
    public get suscription_date(): Date {
        return this._suscription_date;
    }
    public set suscription_date(value: Date) {
        this._suscription_date = value;
    }
    

    constructor(suscriptionState: string, suscription_date?: Date) {
        this.suscriptionState = suscriptionState as SubscriptionEnum;
        this._suscription_date = suscription_date;
    }

    public get SuscriptionState(): string {
        return this.suscriptionState;
    }

    

    public set SuscriptionState(suscriptionState: string) { 
        this.suscriptionState = suscriptionState as SubscriptionEnum;
    }

    public equals(userSuscriptionState: userSuscriptionState): boolean {
        return this.suscriptionState === userSuscriptionState.suscriptionState;
    }
       
}