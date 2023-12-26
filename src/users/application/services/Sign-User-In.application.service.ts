import { NotFoundException } from "@nestjs/common";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { User } from "src/users/domain/userAggregate/user";

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
    if(!user){
      Result.fail<User>(new NotFoundException('user not found'))
    }
    //const payload = {phone: users.value.Id.Id,id: users.value.Id.Id, name: users.value.Name.Name};    
    return Result.success<User>(user.Value);
  }
}