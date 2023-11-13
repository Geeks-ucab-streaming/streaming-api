/** IValueObject: Interfaz generica que define la regla de Value Object con su tipo de parametro .
 *  @typeParam `T` Tipo del parametro del Value Object*/
export interface IValueObject<T> {
    /**Compara la igualdad de dos Value Objects
     * @param same Value Object a comparar.
     * @returns `boolean`*/
    equals(same: T): boolean;
}
