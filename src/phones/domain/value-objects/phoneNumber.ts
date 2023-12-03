
import { ValueObject } from "src/common/domain/ValueObjects/value-object.interface";
import { phoneOperatorsEnum } from "./phoneOperators.enum";
import { PhoneOperator } from "../../../users/domain/phoneOperator/phoneOperator.interface";
import { PhoneInvalidExceptions } from "src/phones/domain/exceptions/phone-not-valid-exception";
import { phonePrefix } from "./phone-value-object";
export interface numberPhoneProps {
    id: string;
    phoneNumber: number;
    prefix: phonePrefix;

}   
export class PhonesNumber extends ValueObject<numberPhoneProps>{
    
    value: numberPhoneProps; 
    constructor(value: numberPhoneProps) {
        super(value);
        if(this.props.prefix.isUsableOperator(this.props.phoneNumber)){
            throw new PhoneInvalidExceptions();
        }
    }
    
}

