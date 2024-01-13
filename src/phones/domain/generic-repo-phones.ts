import { Result } from "src/common/domain/logic/Result";
import { ItransactionHandler } from '../../common/domain/transaction_handler/transaction_handler';

export interface IgenericRepo<T,R>{
    finderCriteria(criteria?: Partial<T>): Promise<R>;
}

export interface IPhoneRepository<R>{
    createPhone(dto: R, runner:ItransactionHandler): Promise<Result<R>>;
  }