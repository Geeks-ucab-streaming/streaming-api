import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { IPhoneRepository, IgenericRepo } from 'src/phones/domain/generic-repo-phones';
//ESTO DEBERIA SER UNA INTERFAZ Y NO USAR LA LIBRERIA DIRECTAMENTE
import {v4 as uuidv4} from 'uuid';
import { PrefixEntity } from '../../infrastructure/entities/prefixes.entity';
import { PhoneInvalidExceptions } from 'src/phones/domain/exceptions/phone-not-valid-exception';
import { ValidateIsUsableOperatorService } from 'src/phones/domain/services/validate-is-usable-operator.domain.service';
import { ValidateIsLineValidService } from 'src/phones/domain/services/validate-line-valid.domain.service';
import { LineInvalidExceptions } from 'src/phones/domain/exceptions/line-not-valid.exception';
import { IApplicationService } from 'src/common/Application/application-service/application.service.interface';
import { Result } from 'src/common/domain/logic/Result';
import { Line } from 'src/phones/domain/phoneAggregate/value-objects/line';
import { UserPhoneFactory } from 'src/users/domain/factories/user-phone.factory';
import { PhoneParameterObject } from 'src/phones/domain/parameterObjects/phoneParameterObject';


export class PhonesService implements IApplicationService<string,Phone> {
  get name(): string {
    return this.constructor.name;
  }

  constructor( 
  private readonly repo:IPhoneRepository<Phone>,
  private readonly repoLines :IgenericRepo <string,PrefixEntity>,
  private readonly valiateisUsableOperator: ValidateIsUsableOperatorService = new ValidateIsUsableOperatorService(),
  private readonly valiateisLineValid: ValidateIsLineValidService = new ValidateIsLineValidService(),
  ){}
  
  async execute(userPhone: string): Promise<Result<Phone>> {
    if(!this.valiateisUsableOperator.execute(userPhone)) 
      Result.fail<Phone>(new PhoneInvalidExceptions(userPhone));

    const prefixEntity = await this.repoLines.finderCriteria(userPhone.toString().substring(0,3));
    const line: Line = Line.create(prefixEntity.linePhone.id,prefixEntity.linePhone.name);
    
    if(!this.valiateisLineValid.execute(line))
      throw new LineInvalidExceptions(line);

    const createdPhone = (await this.repo.createPhone(UserPhoneFactory.phoneFactoryMethod(new PhoneParameterObject(uuidv4(),userPhone,line.id,line.name))));

    return createdPhone;
  }

}

