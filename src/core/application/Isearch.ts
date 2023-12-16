import { Result } from "src/common/domain/logic/Result";

/** Isearch: Es una interfaz genérica utilizada para implementar la busqueda en los servicios de aplicacion .
 *  @typeParam `D` Tipo parametrizado de los DTOs.
 *  @typeParam `R` Tipo parametrizado del resultado.*/

export interface Isearch<D,R>{

search(search: D): Promise<R>;

}