import { Inject, Injectable } from '@nestjs/common';
import { PhoneDto } from "../dtos/phone.dto";
import { IFindService } from 'src/common/domain/ifind.service';
import { Phone } from 'src/phones/domain/phoneAggregate/phone';
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
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { phoneNumber } from 'src/phones/domain/phoneAggregate/phone';



export class PhonesService implements IApplicationService<Phone,Phone> {
  get name(): string {
    return this.constructor.name;
  }

  constructor( 
  private readonly repo:ICreateRepository<Phone>,
  private readonly repoLines :IgenericRepo <string,PrefixEntity>,
  private readonly valiateisUsableOperator: ValidateIsUsableOperatorService = new ValidateIsUsableOperatorService(),
  private readonly valiateisLineValid: ValidateIsLineValidService = new ValidateIsLineValidService(),
  ){}
  async execute(value: Phone): Promise<Result<Phone>> {
    if(!this.valiateisUsableOperator.execute(value.phoneNumber.phoneNumber)) throw new PhoneInvalidExceptions(value.phoneNumber);
    
    const line = await this.repoLines.finderCriteria(value.phoneNumber.phoneNumber.toString().substring(0, 3));
    
    if(!this.valiateisLineValid.execute(line.linePhone)) throw new LineInvalidExceptions(line.linePhone);

    const phone = new Phone(uuidv4(),phoneNumber.create(value.phoneNumber.phoneNumber),line.linePhone);
    return Result.success<Phone>( await this.repo.createPhone(phone));
  }

}

