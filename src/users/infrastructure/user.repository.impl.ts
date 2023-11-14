import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user'; 
import { UserEntity } from './users.entity'; 

import { PhoneEntity } from 'src/phones/infrastructure/phones.entity';

export interface IgenericRepo<T,R>{
    finderCriteria(criteria: Partial<T>): Promise<R | undefined>;
}

export class UserRepository implements  IgenericRepo<PhoneEntity,User> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<User>,
    ) {}
    findById(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async finderCriteria(criteria: Partial<PhoneEntity>): Promise<User | undefined> {
        console.log(criteria)
        return this.repository.createQueryBuilder('user')
            .innerJoinAndSelect('user.phone', 'phone')
            .where('phone.phoneNumber = :phoneNumber', { phoneNumber: criteria.phoneNumber })
            .getOne();
    }
    
}
