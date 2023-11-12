export interface IGenericRepository<T> {
    save(t: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}
