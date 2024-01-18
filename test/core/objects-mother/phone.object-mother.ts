import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { phoneId } from 'src/phones/domain/phoneAggregate/value-objects/phoneId';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/value-objects/phoneNumber';


/*static create(id: string, _phoneNumber:  string, id_line:string,line: string): Phone {
  return new Phone(phoneId.create(id), phoneNumber.create(_phoneNumber), Line.create(id_line,Object.keys(phoneOperatorsEnum).find(key => phoneOperatorsEnum[key] === line)));
}*/

export class PhoneObjectMother {
  static createPhone() {
    let phone = Phone.create(
       '9d934281-d626-44e4-8e1f-14b17504823b',
       '4121234567',
      'a9ebe28a-26fb-4f73-9a81-088a31211d98',
      'Digitel');
    return phone;
  }

}
