import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class artist_name implements ValueObject<string>{

private _value: string;

constructor(private value: string){
    this._value = value;
}



public equals(vo: this): boolean{
    return this.value === vo.value;     

}

public isValid(): boolean{
    return this.value !== null && this.value !== undefined;

}

public getValue(): string{
    return this.value;
}
}