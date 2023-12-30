import { Result } from 'src/common/domain/logic/Result';

/** IApplicationService: Es una interfaz genérica utilizada para implementar servicios de aplicación.
 *  @typeParam `D` Tipo parametrizado de los DTOs.
 *  @typeParam `R` Tipo parametrizado del resultado.*/
export interface IApplicationService<D, R> {
  /**Retorna el nombre del servicio de aplicación. */
  get name(): string;

  /**Ejecuta el servicio de aplicación.
   * @param dto Datos de entrada del servicio de aplicación.*/
  execute(dto?: D): Promise<Result<R>>;
}
