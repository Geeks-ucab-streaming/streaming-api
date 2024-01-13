import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { User } from './userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';
import { ItransactionHandler } from '../../common/domain/transaction_handler/transaction_handler';
export interface IUserRepository {
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  finderCriteria(criteria: Partial<Phone>): Promise<User | undefined>;
  createUser(user: User, runner?: ItransactionHandler): Promise<Result<User>>;
  updateUser(user: User, runner?: ItransactionHandler): Promise<Result<void>>;
}
