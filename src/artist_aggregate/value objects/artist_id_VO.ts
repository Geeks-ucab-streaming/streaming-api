import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class artist_id implements ValueObject<number>{

    private value: number;

    constructor(value: number){
        this.value = value;
    }


    public equals(vo: this): boolean{
        return this.value === vo.value;
    }

    public isValid(): boolean{
        return this.value !== null && this.value !== undefined;
    }

    public getValue(): number{
        return this.value;
    }
}