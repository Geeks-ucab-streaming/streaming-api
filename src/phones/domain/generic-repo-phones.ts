import { Result } from "src/common/domain/logic/Result";

export interface IgenericRepo<T,R>{
    finderCriteria(criteria?: Partial<T>): Promise<R>;
}

export interface IPhoneRepository<R>{
    createPhone(dto: R): Promise<Result<R>>;
  }