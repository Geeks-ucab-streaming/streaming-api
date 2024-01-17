import { IsDate, IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StreamInfoDto {
  @IsUUID()
  @ApiProperty()
  user: string;

  @IsUUID()
  @ApiProperty()
  song: string;

  @IsUUID()
  @ApiProperty()
  playlist?: string;
}
