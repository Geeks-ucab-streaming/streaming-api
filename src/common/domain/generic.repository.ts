export interface  IFindGenericRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  
}
