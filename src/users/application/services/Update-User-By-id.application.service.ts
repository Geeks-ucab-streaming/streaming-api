import { IUserRepository } from "src/users/domain/IUserRepository";
import { User } from "src/users/domain/userAggregate/user";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import { UserBirthDate } from "src/users/domain/userAggregate/value-objects/userBirthDate";
import { UserGender } from "src/users/domain/userAggregate/value-objects/userGender";
import { userSuscriptionState } from "src/users/domain/userAggregate/entities/userSuscriptionState";
import { NotFoundException } from "@nestjs/common";
import { IApplicationService } from "src/common/Application/application-service/application.service.interface";
import { Result } from "src/common/domain/logic/Result";
import { UpdateUser } from "../ParameterObjects/updateUser";

export class UpdateUserById implements IApplicationService<UpdateUser, User> {
//InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(
    private readonly repo: IUserRepository,
  ) {}
  get name(): string {
    throw new Error("Method not implemented.");
  }

  async execute(userDto: UpdateUser): Promise<Result<User>>{
    //attrs: Partial<User> te permite colocar la cantidad de parámetros que quieras del objeto User, hacíendolo más flexible. 
    //Puedes pasar un objeto vacío, con el nombre, la fecha de nacimiento o lo que sea: va a funcionar.
    //TODO: FALTA VALIDAR EL GENERO Y COLOCAR EMAIL
    const user = await this.repo.findById(userDto.id);
    const userUpdated = User.create(
      user.Id,
      user.Phone,
      userName.create(userDto.userToUpdate.name)|| user.Name,
      UserBirthDate.create(new Date(userDto.userToUpdate.birth_date || user.BirthDate.BirthDate),new Date(userDto.userToUpdate.birth_date ||user.BirthDate.BirthDate).getFullYear()),
      UserGender.create(userDto.userToUpdate.gender || user.Gender.Gender),
      userSuscriptionState.create(userDto.userToUpdate.suscriptionState || user.SuscriptionState.SuscriptionState)
      )
    if (!user){
      throw new NotFoundException("user not found");
    }
    return Result.success<User>(userUpdated);
  }
  
}