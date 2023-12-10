export class userSuscriptionState {
    static create(suscriptionState: string): userSuscriptionState {

        return new userSuscriptionState(suscriptionState);
    }

    private suscriptionState: string;
    

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