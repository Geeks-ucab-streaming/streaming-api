export interface IFindGenericService<T>  {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}
