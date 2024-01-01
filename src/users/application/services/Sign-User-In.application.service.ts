import { NotFoundException } from "@nestjs/common";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { User } from "src/users/domain/userAggregate/user";
import { DomainException } from '../../../common/domain/exceptions/domain-exception';

export class SignUserIn implements IApplicationService<string, User>{

  constructor(
    private findByPhoneUserService: IApplicationService<string, User>){
    }

    get name(): string {
      return this.constructor.name;
    }

  async execute(phone: string){
    //validation by operator in service
    //validation if user exists
    const user = await this.findByPhoneUserService.execute(phone); 
    if(!user.value){
      return Result.fail<User>(new DomainException<User>(void 0,'User not found','DomainException',404))
    }
    //const payload = {phone: users.value.Id.Id,id: users.value.Id.Id, name: users.value.Name.Name};    
    return Result.success<User>(user.Value);
  }
}