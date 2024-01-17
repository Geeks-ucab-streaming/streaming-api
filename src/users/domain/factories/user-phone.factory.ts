import { phoneId } from "src/phones/domain/phoneAggregate/value-objects/phoneId";
import { phoneNumber } from "src/phones/domain/phoneAggregate/value-objects/phoneNumber";
import { phoneOperatorsEnum } from "../../../phones/domain/phoneAggregate/enums/phoneOperators.enum";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { Line } from "src/phones/domain/phoneAggregate/value-objects/line";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";

export class UserPhoneFactory {
  public static phoneFactoryMethod(phone: PhoneParameterObject): Phone {
        return new Phone(phoneId.create(phone.idPhone), phoneNumber.create(phone.phoneNumber), Line.create(phone.idLine,Object.keys(phoneOperatorsEnum).find(key => key === phone.line.toUpperCase()
         )));
    }
}