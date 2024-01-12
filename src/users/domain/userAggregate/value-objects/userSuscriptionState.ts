import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { SubscriptionEnum } from "../enums/subscriptionEnum";

export class userSuscriptionState implements IValueObject<userSuscriptionState>{
    private suscriptionState: SubscriptionEnum;
    private _suscription_date: Date;

    constructor(suscriptionState: string, suscription_date?: Date) {
        this.suscriptionState = suscriptionState as SubscriptionEnum;
        this._suscription_date = suscription_date;
    }

    public get suscription_date(): Date {
        return this._suscription_date;
    }

    public get SuscriptionState(): string {
        return this.suscriptionState;
    }

    static create(suscriptionState: string, subscriptionDate: Date): userSuscriptionState {
        return new userSuscriptionState(suscriptionState,subscriptionDate);
    }

    public equals(userSuscriptionState: userSuscriptionState): boolean {
        return this.suscriptionState === userSuscriptionState.suscriptionState;
    }
       
}