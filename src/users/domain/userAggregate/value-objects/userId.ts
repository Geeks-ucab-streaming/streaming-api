import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class userId implements IValueObject<userId> {

    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public getValue(): string {
        return this.id;
    }

    public equals(userId: userId): boolean {
        return this.id === userId.getValue();
    }
       
}