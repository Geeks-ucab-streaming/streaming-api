import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../infrastructure/users.entity";
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {

  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  create(users: CreateUserDto){
    const user = this.repo.create(users); //Crea la intancia del usuario
    return this.repo.save(user); //Guarda la instancia en la BD.
  }

  find(id: number){
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el número de teléfono.
    return this.repo.find({ where: { id } });
  }

}

