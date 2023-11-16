
export interface IGenericRepository<T, R> {
    execute(request: T): Promise<R>;
}
