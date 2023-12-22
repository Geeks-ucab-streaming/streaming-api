import { Result } from "src/common/domain/logic/Result";

export interface Iaudith {
    /**Permite crear el audith.
     * @param message DTO a audith */
    audith(id: string, origin: JSON): Promise<JSON>;
  }