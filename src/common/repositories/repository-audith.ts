import {Repository } from "typeorm";
import { Audith } from "../infrastructure/entities/audith.service.entity";
import { IaudithRepository } from "../Application/audith-handler/Iaudith";

export class audith_repo extends Repository<Audith> implements IaudithRepository{
 audith_repo:Audith;
  async audith(id: string, origin: JSON): Promise<JSON> {
    this.audith_repo.id = id;
    this.audith_repo.origin = origin;
    return JSON.parse(JSON.stringify(this.audith));
}
}