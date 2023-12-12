
import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { User } from "../userAggregate/user";

export class UserAlreadyExistsExceptions extends DomainException<User> {
    constructor(user: User) {
       super(user,"Invalid Line phone", "UserAlreadyExistsExceptions", 400);
    }
}