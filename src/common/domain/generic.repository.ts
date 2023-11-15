export interface IGenericRepository<T> {
  find(id?: string): Promise<T | T[]>;
}
