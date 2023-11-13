export interface IService<T, R> {
    execute(request: T): Promise<R>;
}


