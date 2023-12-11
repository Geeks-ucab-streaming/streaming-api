import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { User } from "../userAggregate/user";

export class UserNotFound extends DomainException<User> {
    constructor(user: User) {
       super(user,"User was not Found", "UserNotFound", 404);
    }
}