import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/users/domain/userAggregate/user';
import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';
import { IUserRepository } from 'src/users/domain/IUserRepository';

@Injectable()
export class UsersService {
  //InjectRepository(): Le decimos al sistema de DI que necesitamos usar el reporistorio de "User".
  //DI usa esta notación (Repository<User>) para avaeriguar cuál instancia necesita "inyectar" a esta clase en tiempo de ejecución.
  //Se usa el decorador porque Repository<User> tiene un parámetro genérico
  constructor(
    private readonly repo: IUserRepository,
  ) {}

  async create(user: User) {
    //Asigna los valores de la instancia de User a la instancia de UserEntity
    const savedUser = await this.repo.createUser(user); //Guarda la instancia en la BD.
    console.log(savedUser);
    return savedUser;
  }

  find(id: string) {
    //Devuelve un array de muchos registros que cumplan un criterio
    //El criterio es el número de teléfono.
    return this.repo.findById(id);
  }
}
