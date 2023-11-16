export interface IFindGenericRepository<T> {
  find(id?: string): Promise<T | T[]>;
}
