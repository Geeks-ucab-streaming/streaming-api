import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class userId implements IValueObject<userId> {
 
    private id: string;
    
    constructor(id: string) {
        this.id = id;
    }

    static create(id: string): userId {
        return new userId(id);
    }

    public getId(): string {
        return this.id;
    }

    public equals(userId: userId): boolean {
        return this.id === userId.id;
    }
       
}