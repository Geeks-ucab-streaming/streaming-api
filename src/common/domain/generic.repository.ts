export interface IGenericRepositoryFinder<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}
