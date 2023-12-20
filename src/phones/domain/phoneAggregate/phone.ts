import { Line } from './value-objects/line';
import { phoneOperatorsEnum } from './value-objects/phoneOperators.enum';
import { phoneNumber } from '../phoneAggregate/value-objects/phoneNumber';
import { phoneId } from './value-objects/phoneId';
import { DomainEvent } from 'src/common/domain/Event/domain-event';
import { PhoneCreated } from '../events/phone-created';
import { AggregateRoot } from 'src/common/domain/aggregate-root';

export class Phone extends AggregateRoot<phoneId> {
  private idPhone: phoneId;
  private phoneNumber: phoneNumber;
  private linePhone: Line;

  constructor(idPhone: phoneId, phoneNumber:  phoneNumber, line: Line) {
    const phoneCreated = PhoneCreated.create(idPhone, phoneNumber, line);
    super(idPhone, phoneCreated);
  }

  static create(id: string, _phoneNumber:  number, id_line:string,line: string): Phone {
    return new Phone(phoneId.create(id), phoneNumber.create(_phoneNumber), Line.create(id_line,Object.keys(phoneOperatorsEnum).find(key => phoneOperatorsEnum[key] === line)));
  }

  get Id(): phoneId {
    return this.idPhone;
  } 

  get PhoneNumber(): phoneNumber{
    return this.phoneNumber;
  }   

  get LinePhone(): Line {
    return this.linePhone;
  }

  //asignando estado
  protected when(event: DomainEvent): void {
    switch (event.constructor) {
        case PhoneCreated:
            const phoneCreated: PhoneCreated = event as PhoneCreated;
            this.idPhone = phoneCreated.id;
            this.phoneNumber = phoneCreated.userPhoneNumber;
            this.linePhone = phoneCreated.linePhone;
            break;
        default:
          throw new Error("Event not implemented.");
    }
}
  
  //validando estado
  protected ensureValidState(): void {
    console.log("Falta este método por implementar (ensureValidState) en phone");
  }

}


