export interface IGenericRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}
