import {IValueObject} from "../../../common/domain/valueObject.interface";
import { Operators } from "../services/phoneOperator/phoneOperator";

export class PhonesNumber extends Operators implements IValueObject<PhonesNumber>{
    value: number;
    constructor(value: number) {
        super(value);
        this.value = value;
    }

    equals(same: PhonesNumber): boolean {
        return same.value === this.value;
    }
}

