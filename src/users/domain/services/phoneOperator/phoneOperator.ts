import { PhoneOperator } from "../../phoneOperator/phoneOperator.interface";
import {  phoneOperatorsEnum } from "../../value-objects/phoneOperators.enum";
export class Operators implements PhoneOperator{

    constructor(prefix : number) {
        if(this.isUsableOperator(prefix)){
            console.log("Operador no disponible");
        }
    }
    isUsableOperator(phoneNumber: number): boolean {
        return !Object.values(phoneOperatorsEnum).includes(phoneNumber.toString().substring(0,3) as phoneOperatorsEnum);
    }
}