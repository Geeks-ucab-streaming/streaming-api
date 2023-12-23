import { json } from "stream/consumers";
import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import { Iaudith } from "src/common/Application/audith-handler/Iaudith";
import { Audith } from "src/common/infrastructure/entities/audith.service.entity";
import { audith_repo } from "src/common/repositories/repository-audith";
import {v4 as uuidv4} from 'uuid';

/**
 * Decorator class that adds auditing functionality to an application service.
 * @template JSON - The type of the input DTO.
 * @template R - The type of the result.
 */
export class AudithServiceDecorator<JSON,R> extends ApplicationServiceDecorator<JSON,R>{

private audith:Audith ;


  constructor(applicationservice: ApplicationServiceDecorator<JSON,R>,audith: audith_repo){
    super(applicationservice);
    this.audith.id = uuidv4();
    this.audith.origin = JSON.parse(JSON.stringify(applicationservice));
  }

  async execute(dto: JSON): Promise<Result<R>> {

    return await Result.success<Audith>(await(this.audith));
  }

  
}
