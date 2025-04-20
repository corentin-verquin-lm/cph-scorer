import { RankingType } from '../../model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { MatchDTO } from './match.dto';

export class MatchUpdateDTO {
  @ApiProperty()
  @IsNotEmpty()
  public match: MatchDTO;

  @ApiProperty({ enum: RankingType })
  @IsNotEmpty()
  @IsEnum(RankingType)
  public type: RankingType;
}
