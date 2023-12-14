import { Phone } from 'src/phones/domain/value-objects/phone';
import { User } from './userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';
export interface IUserRepository {
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  finderCriteria(criteria: Partial<Phone>): Promise<User | undefined>;
  createUser(user: User): Promise<Result<void>>;
}
