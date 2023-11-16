import { IsDate, IsString, IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @IsDate()
  @ApiProperty()
  editionDate: Date;

  @IsString()
  @ApiProperty()
  fields: string;

  @IsNumber()
  @ApiProperty()
  oldValue: number;

  @IsNumber()
  @ApiProperty()
  newValue: number;
}
