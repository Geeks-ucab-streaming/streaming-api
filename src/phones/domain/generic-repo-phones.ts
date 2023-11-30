export interface IgenericRepo<T,R>{
    finderCriteria(criteria: Partial<T>): Promise<R | void>;
}

export interface ICreateRepository<R>{
    create(dto: R): Promise<R>;
  }