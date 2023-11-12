import { IsDate, IsString, IsOptional, IsNumber} from "class-validator";

export class UpdateUserDto {
  @IsDate()
  @IsOptional()
  editionDate: Date;

  @IsString()
  @IsOptional()
  fields: string;

  @IsNumber()
  @IsOptional()
  oldValue: number;

  @IsNumber()
  @IsOptional()
  newValue: number;

}

