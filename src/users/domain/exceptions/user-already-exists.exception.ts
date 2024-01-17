
import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { User } from "../userAggregate/user";

export class PhoneAlreadyExistsExceptions extends DomainException<User> {
    constructor(user: User) {
       super(user,"Phone alredy exists", "UserAlreadyExistsExceptions", 400);
    }
}