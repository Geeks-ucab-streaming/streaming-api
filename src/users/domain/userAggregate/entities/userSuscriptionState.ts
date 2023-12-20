export class userSuscriptionState {
    static create(suscriptionState: string): userSuscriptionState {

        return new userSuscriptionState(suscriptionState);
    }

    private suscriptionState: string;
    private _suscription_date: Date;

    
    public get suscription_date(): Date {
        return this._suscription_date;
    }
    public set suscription_date(value: Date) {
        this._suscription_date = value;
    }
    

    constructor(suscriptionState: string) {
        this.suscriptionState = suscriptionState;
    }

    public get SuscriptionState(): string {
        return this.suscriptionState;
    }

    public set SuscriptionState(suscriptionState: string) { 
        this.suscriptionState = suscriptionState;
    }

    public equals(userSuscriptionState: userSuscriptionState): boolean {
        return this.suscriptionState === userSuscriptionState.suscriptionState;
    }
       
}