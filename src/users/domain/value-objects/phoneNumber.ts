
import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { Operators } from "../services/phoneOperator/phoneOperator";
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { PhoneOperator } from "../phoneOperator/phoneOperator.interface";
import { BadRequestException } from "@nestjs/common";
export interface numberPhoneProps {
    value: number;
}   
export class PhonesNumber extends ValueObject<numberPhoneProps> implements PhoneOperator{
    value: numberPhoneProps; 
    constructor(value: numberPhoneProps) {
        super(value);
        if(this.isUsableOperator(value.value)){
            throw new BadRequestException('Invalid phone operator');
        }
    }

    isUsableOperator(phoneNumber: number): boolean {
        return !Object.values(phoneOperatorsEnum).includes(phoneNumber.toString().substring(0,3) as phoneOperatorsEnum);
    }
    
}
