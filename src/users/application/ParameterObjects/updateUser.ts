import { Imapper } from "src/core/application/IMapper";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";

export class UpdateUser {
 public id: string;
 public userToUpdate: Partial<UserEntity>;
 public mapper: Imapper<User, UpdateUserDto>;

 constructor(id: string, userToUpdate: Partial<UserEntity>, mapper: Imapper<User, UpdateUserDto>) {
  this.id = id;
  this.userToUpdate = userToUpdate;
  this.mapper = mapper;
 }

 set Id(id: string) {
  this.id = id;
 }

 set UserToUpdate(userToUpdate: Partial<UserEntity>) {
  this.userToUpdate = userToUpdate;
 }

}