import { Imapper } from "src/core/application/IMapper";
import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";
import { UserDto } from "../dtos/user.dto";

export class UpdateUser {
 public id: string;
 public userToUpdate: Partial<UserEntity>;
 public mapper: Imapper<User, UserDto>;

 constructor(id: string, userToUpdate: Partial<UserEntity>, mapper: Imapper<User, UserDto>) {
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