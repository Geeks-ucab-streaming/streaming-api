export interface IFindService<T, R> {
  execute(value: T): Promise<R>;
}
