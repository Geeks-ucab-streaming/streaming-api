import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
import { Iaudith } from "src/common/Application/application-service/decorators/error-decorator/audith-handler/Iaudith";
import { AudithServiceDecorator } from "src/common/Application/application-service/decorators/error-decorator/audith-application.servive.decorator";

@Entity()
export class Audith{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column() 
  origin: JSON;
  
  }

