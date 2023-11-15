import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user'; 
import { UserEntity } from './users.entity'; 

import { IgenericRepo } from 'src/phones/domain/generic-repo-phones';
import { Phone } from 'src/phones/domain/phone';

export class UserRepository implements  IgenericRepo<Phone,User> {
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

    async finderCriteria(criteria: Partial<Phone>): Promise<User | undefined> {
        console.log(criteria.phoneNumber);
        return this.repository.createQueryBuilder('user')
            .innerJoinAndSelect('user.phone', 'phone')
            .where('phone.phoneNumber = :phoneNumber', { phoneNumber: criteria.phoneNumber })
            .getOne();
    }
    
}
