import { Result } from "src/common/domain/logic/Result";
import { audith_repo } from "src/common/repositories/repository-audith";

export interface IaudithRepository {
    audith(id: string, origin:JSON):Promise<JSON>;
  }