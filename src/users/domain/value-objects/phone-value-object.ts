
import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { Operators } from "../services/phoneOperator/phoneOperator";
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { PhoneOperator } from "../phoneOperator/phoneOperator.interface";
export interface numberPhonePrefixProps {
    value: number;
}   
export class phonePrefix extends ValueObject<numberPhonePrefixProps> implements PhoneOperator{
    get value(): number {  
        return this.props.value;
    }

    constructor(value: numberPhonePrefixProps) {
        super(value);
        if(this.isUsableOperator(value.value)){
            console.log("Operador no disponible");
        }
    }
    isUsableOperator(phoneNumber: number): boolean {
        return !Object.values(phoneOperatorsEnum).includes(phoneNumber.toString().substring(0,3) as phoneOperatorsEnum);
    }
    
}

