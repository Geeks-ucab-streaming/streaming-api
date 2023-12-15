import { json } from "stream/consumers";
import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { Iaudith } from "./audith-handler/Iaudith";

/**
 * Decorator class that adds auditing functionality to an application service.
 * @template JSON - The type of the input DTO.
 * @template R - The type of the result.
 */
export class AudithServiceDecorator<JSON,R> extends ApplicationServiceDecorator<JSON,R> {

private audith: Iaudith;
private date: number;

  constructor(applicationservice: ApplicationServiceDecorator<JSON,R>,audith: Iaudith){
    super(applicationservice);
    this.audith = audith;
    this.date=Date.now();
  }

  async execute(dto: JSON): Promise<Result<R>> {
    return await super.execute(dto);
  }

  
}
