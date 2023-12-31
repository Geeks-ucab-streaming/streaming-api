import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { User } from './userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';
import { UserEntity } from '../infrastructure/entities/users.entity';
export interface IUserRepository {
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  finderCriteria(criteria: Partial<Phone>): Promise<User | undefined>;
  createUser(user: User): Promise<Result<User>>;
  updateUser(user: User): Promise<Result<void>>;
}
