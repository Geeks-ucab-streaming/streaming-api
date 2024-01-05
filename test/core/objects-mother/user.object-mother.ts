import { CreateUserDto } from "src/users/application/dtos/create-user.dto";
import { userId } from "src/users/domain/userAggregate/value-objects/userId";

export class UserObjectMother {
  static createUser(userID: userId) {
    const user: CreateUserDto = {
      phone: '4121234567',
      token:
        'dfhygzT0QZG8Qt2gavQIdI:APA91bHr1cGJCUK9cfW7UuYOqH-dfqfRxP1Gp61riytbvoS7Y3kjRCu2NMGxb44wp_ChfCWbxDgbJ7W-4yTewALy4frn54S9sMcK5cN-XiKln9OcZfdFgrFydyffvH2wFtk5kCw20Pst',
    };
    return user;
  }
}
