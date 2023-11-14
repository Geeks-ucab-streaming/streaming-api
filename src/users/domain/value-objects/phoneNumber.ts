
import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { Operators } from "../services/phoneOperator/phoneOperator";

export class PhonesNumber extends Operators implements IValueObject<PhonesNumber>{
    value: number; 
    constructor(value: number) {
        super(value);
        this.value = value;
    }

    public equals(vo: PhonesNumber): boolean {
        return this.value === vo.value;
    }
    
}

