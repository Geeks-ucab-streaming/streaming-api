import { Phone } from 'src/phones/domain/phone';
import { User } from './user';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  finderCriteria(criteria: Partial<Phone>): Promise<User | undefined>;
}
