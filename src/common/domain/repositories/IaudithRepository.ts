
export interface IaudithRepository {
    audith(id: string, origin:JSON):Promise<JSON>;
  }