
export interface  IFindGenericRepository<T, R> {
    execute(request: T): Promise<R>;
}
