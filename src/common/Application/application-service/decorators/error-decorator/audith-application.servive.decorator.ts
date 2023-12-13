import { json } from "stream/consumers";
import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { Iaudith } from "./audith-handler/Iaudith";
import { userName } from "src/users/domain/userAggregate/value-objects/userName";
import {Column, Entity,PrimaryGeneratedColumn } from "typeorm";


export class AudithServiceDecorator<D,R> extends ApplicationServiceDecorator<D,R> {

private readonly audith: Iaudith;
private date: number;

  constructor(applicationservice: ApplicationServiceDecorator<D,R>,audith: Iaudith){
    super(applicationservice);
    this.audith = audith;
    this.date=Date.now();
  }

  async execute(dto: D): Promise<Result<R>> {
    return await super.execute(dto);
  }

  
}
