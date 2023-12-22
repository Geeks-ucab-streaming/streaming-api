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
import { UserCreated } from "src/users/domain/events/user-created";

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

  async execute(usuarioParametrizado: UpdateUser): Promise<Result<User>>{
    //attrs: Partial<User> te permite colocar la cantidad de parámetros que quieras del objeto User, hacíendolo más flexible. 
    //Puedes pasar un objeto vacío, con el nombre, la fecha de nacimiento o lo que sea: va a funcionar.
    //TODO: FALTA VALIDAR EL GENERO Y COLOCAR EMAIL
    const user = await this.repo.findById(usuarioParametrizado.id);
    
    if (!user) return Result.fail<User>(new NotFoundException('user not found'))
    const userUpdated = User.create(
      user.Id,
      user.Phone,
      userSuscriptionState.create(usuarioParametrizado.userToUpdate.suscriptionState || user.SuscriptionState.SuscriptionState),
      userName.create(usuarioParametrizado.userToUpdate.name)|| user.Name,
      UserBirthDate.create(new Date(usuarioParametrizado.userToUpdate.birth_date || user.BirthDate.BirthDate),new Date(usuarioParametrizado.userToUpdate.birth_date ||user.BirthDate.BirthDate).getFullYear()),
      UserGender.create(usuarioParametrizado.userToUpdate.gender || user.Gender.Gender),
      )
    
    Object.assign(user, usuarioParametrizado.userToUpdate);
    const savedUser = await this.repo.updateUser(userUpdated); //Guarda la instancia en la BD.
    return Result.success<User>(await usuarioParametrizado.mapper.ToDomain(savedUser));
  }
  
}