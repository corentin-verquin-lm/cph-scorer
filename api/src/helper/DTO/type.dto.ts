import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RankingType } from '../../model';

export class TypeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(RankingType)
  public type: RankingType;
}
