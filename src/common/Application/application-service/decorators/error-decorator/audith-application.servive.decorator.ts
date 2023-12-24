import { json } from "stream/consumers";
import { Result } from "src/common/domain/logic/Result";
import { IApplicationService } from "../../application.service.interface";
import { ApplicationServiceDecorator } from "./application.service.decorator";
import {IaudithRepository } from "src/common/Application/audith-handler/Iaudith";
import { Audith } from "src/common/infrastructure/entities/audith.service.entity";
import { audith_repo } from "src/common/repositories/repository-audith";
import {v4 as uuidv4} from 'uuid';

/**
 * Decorator class that adds auditing functionality to an application service.
 * @template JSON - The type of the input DTO.
 * @template R - The type of the result.
 */
export class AudithServiceDecorator<JSON,Audith> extends ApplicationServiceDecorator<JSON,Audith>{

private audith: audith_repo

  constructor(applicationservice: ApplicationServiceDecorator<JSON,Audith>, Audith: audith_repo){
    super(applicationservice);
    this.audith= Audith;
  }

  async execute(dto: JSON): Promise<Result<Audith>> {
    this.audith.audith(uuidv4(),JSON.parse(JSON.stringify(dto)));
    return this.applicationService.execute(dto);  
  }
}

// Assuming these classes are defined somewhere in your code
// Create instances of the required classes
//let applicationService = new GetArtistProfilesApplicationService<JSON, Audith>();
//let audithRepo = new audith_repo();

// Create an instance of AudithServiceDecorator
//let audithServiceDecorator = new AudithServiceDecorator<JSON, Audith>(applicationService, audithRepo);

