import { Phone } from 'src/phones/domain/phoneAggregate/phone';
import { User } from './userAggregate/user';
import { Result } from 'src/common/domain/logic/Result';
import { ItransactionHandler } from '../../common/domain/transaction_handler/transaction_handler';
import { TransactionHandlerImplementation } from '../../common/infrastructure/transaction_handler_implementation';
export interface IUserRepository {
  findById(id: string,runner?: ItransactionHandler): Promise<User>;
  findAll(): Promise<User[]>;
  finderCriteria(
    criteria: Partial<Phone>,
    runner?: ItransactionHandler,
  ): Promise<User | undefined>;
  createUser(user: User, runner?: ItransactionHandler): Promise<Result<User>>;
  updateUser(user: User, runner?: ItransactionHandler): Promise<Result<void>>;
}
