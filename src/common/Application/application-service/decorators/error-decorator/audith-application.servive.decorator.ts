import { json } from "stream/consumers";
import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { Iaudith } from "src/common/Application/audith-handler/Iaudith";
import { Audith } from "src/common/infrastructure/entities/audith.service.entity";
import { audith_repo } from "src/common/repositories/repository-audith";

/**
 * Decorator class that adds auditing functionality to an application service.
 * @template JSON - The type of the input DTO.
 * @template R - The type of the result.
 */
export class AudithServiceDecorator<JSON,Audith> extends ApplicationServiceDecorator<JSON,Audith> {

private audithrepo: audith_repo;
private id: string;


  constructor(applicationservice: ApplicationServiceDecorator<JSON,Audith>,audith: Iaudith){
    super(applicationservice);
  }

  async execute(dto: JSON): Promise<Result<Audith>> {
    return Result.success<Audith>(await this.audithrepo.audith(this.id,dto));
  }

  
}
