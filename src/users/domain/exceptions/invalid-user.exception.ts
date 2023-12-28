import { DomainException } from "src/common/domain/exceptions/domain-exception";
import { User } from "../userAggregate/user";


export class InvalidUserException extends DomainException<User> {
  constructor(user: User) {
    super(user,"Invalid User. The user'd ID and Phone must be required parameters (not null)", "InvalidUserException", 400);
 }
}