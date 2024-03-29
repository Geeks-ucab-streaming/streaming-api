import { PhoneParameterObject } from 'src/phones/domain/parameterObjects/phoneParameterObject';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { UserPhoneFactory } from 'src/users/domain/factories/user-phone.factory';
import { User } from 'src/users/domain/userAggregate/user';
import { Token } from 'src/users/domain/userAggregate/value-objects/token';
import { userId } from 'src/users/domain/userAggregate/value-objects/userId';
import { userSuscriptionState } from 'src/users/domain/userAggregate/value-objects/userSuscriptionState';

export class UserObjectMother {
  static createUser() {
    let usuario = User.create(
      userId.create('2a211e29-4290-4783-9f7b-e98b36fbfe35'),
      UserPhoneFactory.phoneFactoryMethod(
        new PhoneParameterObject(
          '9d934281-d626-44e4-8e1f-14b17504823b',
          '4121234567',
          'a9ebe28a-26fb-4f73-9a81-088a31211d98',
          'Digitel',
        ),
      ),
      userSuscriptionState.create('premium', new Date(Date.now())),
      [
        Token.create(
          'dfhygzT0QZG8Qt2gavQIdI:APA91bHr1cGJCUK9cfW7UuYOqH-dfqfRxP1Gp61riytbvoS7Y3kjRCu2NMGxb44wp_ChfCWbxDgbJ7W-4yTewALy4frn54S9sMcK5cN-XiKln9OcZfdFgrFydyffvH2wFtk5kCw20Pst',
          '2a211e29-4290-4783-9f7b-e98b36fbfe35',
        ),
      ],
    );
    return usuario;
  }

  static createUserNoValid() {
    let usuario = User.create(
      userId.create('0000000'),
      UserPhoneFactory.phoneFactoryMethod(
        new PhoneParameterObject(
          '0000000',
          '4120000000',
          'idline00000',
          'Digitel',
        ),
      ),
      userSuscriptionState.create('gratuito', new Date(Date.now())),
      [Token.create('00000', '000000')],
    );
    return usuario;
  }
}
