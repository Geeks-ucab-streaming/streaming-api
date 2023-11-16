export interface Factory<T, R> {
  factoryMethod(object: T): R;
}
