import { Result } from "src/common/domain/logic/Result";

export interface IaudithRepository {
    audith(id: string, origin:JSON):Promise<JSON>;
  }