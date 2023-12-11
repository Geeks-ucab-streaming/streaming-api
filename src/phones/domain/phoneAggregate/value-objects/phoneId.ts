import { IValueObject } from "src/common/domain/ValueObjects/value-object.interface";

export class phoneId implements IValueObject<phoneId> {
 
    private id: string;
    
    constructor(id: string) {
        this.id = id;
    }

    static create(id: string): phoneId {
        return new phoneId(id);
    }

    public get Id(): string {
        return this.id;
    }

    public equals(userPhoneId: phoneId): boolean {
        return this.id === userPhoneId.id;
    }
       
}