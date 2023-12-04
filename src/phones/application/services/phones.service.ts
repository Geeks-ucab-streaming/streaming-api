import { Inject, Injectable } from '@nestjs/common';
import { PhoneDto } from "../dtos/phone.dto";
import { IFindService } from 'src/common/domain/ifind.service';
import { Phone } from 'src/phones/domain/value-objects/phone';
import { ICreateRepository, IgenericRepo } from 'src/phones/domain/generic-repo-phones';
//ESTO DEBERIA SER UNA INTERFAZ Y NO USAR LA LIBRERIA DIRECTAMENTE
import {v4 as uuidv4} from 'uuid';
import { LineEntity } from 'src/phones/infrastructure/lines.entity';
import { CreatePhoneDto } from '../dtos/create-phone.dto';
import { PrefixEntity } from 'src/phones/infrastructure/prefixes.entity';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { ValidateIsUsableOperatorService } from 'src/phones/domain/services/validate-is-usable-operator.domain.service';
import { ValidateIsLineValidService } from 'src/phones/domain/services/validate-line-valid.domain.service';
import { LineInvalidExceptions } from 'src/phones/domain/exceptions/line-not-valid.exception';



export class PhonesService implements IFindService<PhoneDto,Phone> {

  constructor( 
  private readonly repo:ICreateRepository<Phone>,
  private readonly repoLines :IgenericRepo <string,PrefixEntity>,
  private readonly valiateisUsableOperator: ValidateIsUsableOperatorService = new ValidateIsUsableOperatorService(),
  private readonly valiateisLineValid: ValidateIsLineValidService = new ValidateIsLineValidService(),
  ){}
  async execute(value: CreatePhoneDto): Promise<Phone> {
    console.log(value)
    console.log(!this.valiateisUsableOperator.execute(value.phoneNumber))
    if(!this.valiateisUsableOperator.execute(value.phoneNumber)) throw new PhoneInvalidExceptions();
    
    const line = await this.repoLines.finderCriteria(value.phoneNumber.toString().substring(0, 3));
    
    if(!this.valiateisLineValid.execute(line.linePhone)) throw new LineInvalidExceptions();

    const phone = new Phone(uuidv4(),value.phoneNumber,line.linePhone);
    return this.repo.createPhone(phone);
  }

}

