import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class artist_image_reference implements ValueObject<Buffer>{

private value: Buffer;

constructor(value: Buffer){
    this.value = value;

}


public equals(vo: this): boolean{
    return this.value === vo.value;     

}

public isValid(): boolean{
    return this.value !== null && this.value !== undefined;

}

public getValue(): Buffer{
    return this.value;
}
}