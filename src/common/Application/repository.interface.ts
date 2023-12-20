import { IValueObject } from "../domain/ValueObjects/value-object.interface";
import { AggregateRoot } from "../domain/aggregate-root";

/** IRepository: Es una interfaz genérica utilizada para implementar permanencia.
 *  @typeParam `I` Tipo del parametro del identificador del agregado.
 *  @typeParam `A` Tipo del parametro del agregado*/
export interface IRepository<I extends IValueObject<I>, A extends AggregateRoot<I>> {
  /**Persiste un agregado.
   * @param aggregate Agregado a persistir.*/
  saveAggregate(aggregate: A): Promise<void>;

  /**Busca el agregado según su identificador único.
   * @param id Identificador del agregado. */
  findOneByTheId(id: I): Promise<A>;

  /**Busca el agregado según su identificador único, en caso de no encontrarse falla.
   * @param id Identificador del agregado. */
  findOneByIdOrFail(id: I): Promise<A>;
}
