import { Factory } from "src/common/domain/factories/icreator.interface";
import { phoneId } from "src/phones/domain/phoneAggregate/value-objects/phoneId";
import { phoneNumber } from "src/phones/domain/phoneAggregate/value-objects/phoneNumber";
import { phoneOperatorsEnum } from "../userAggregate/value-objects/phoneOperators.enum";
import { Phone } from "src/phones/domain/phoneAggregate/phone";
import { Line } from "src/phones/domain/phoneAggregate/value-objects/line";
import { PhoneParameterObject } from "src/phones/domain/parameterObjects/phoneParameterObject";

export class UserPhoneFactory implements Factory<PhoneParameterObject, Phone>{
  public factoryMethod(phone: PhoneParameterObject): Phone {
        return new Phone(phoneId.create(phone.idPhone), phoneNumber.create(phone.phoneNumber), Line.create(phone.idLine,Object.keys(phoneOperatorsEnum).find(key => phoneOperatorsEnum[key] === phone.line)));
    }
}