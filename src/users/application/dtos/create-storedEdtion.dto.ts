import { IsDate, IsString, IsNumber} from "class-validator";

export class UpdateUserDto {
  @IsDate()
  editionDate: Date;

  @IsString()
  fields: string;

  @IsNumber()
  oldValue: number;

  @IsNumber()
  newValue: number;
}
