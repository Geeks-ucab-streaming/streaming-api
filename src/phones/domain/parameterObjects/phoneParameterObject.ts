import { Imapper } from "src/core/application/IMapper";
import { User } from "src/users/domain/userAggregate/user";
import { UserEntity } from "src/users/infrastructure/entities/users.entity";

export class PhoneParameterObject {
 public idPhone: string;
 public phoneNumber: number;
 public idLine: string;
 public line: string; 

 constructor(idPhone: string, phoneNumber: number, idLine: string, line: string) {
  this.idPhone = idPhone;
  this.phoneNumber = phoneNumber;
  this.idLine = idLine;
  this.line = line;
 }
 
}
