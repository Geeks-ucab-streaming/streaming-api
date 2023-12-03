export interface IgenericRepo<T,R>{
    finderCriteria(criteria?: Partial<T>): Promise<R>;
}

export interface ICreateRepository<R>{
    createPhone(dto: R): Promise<R>;
  }