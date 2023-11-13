import { PhoneOperator } from "../../phoneOperator/phoneOperator.interface";
import {  phoneOperatorsEnum } from "../../value-objects/phoneOperators.enum";
export class Operators implements PhoneOperator{

    constructor(prefix : number) {
        if(this.isUsableOperator(prefix)){
            throw new Error("Invalid Operator");
        }
    }
    isUsableOperator(phoneNumber: number): boolean {
        return !Object.values(phoneOperatorsEnum).includes(phoneNumber.toString() as phoneOperatorsEnum);
    }
}