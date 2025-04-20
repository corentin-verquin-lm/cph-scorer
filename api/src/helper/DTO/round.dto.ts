import { Round } from '../../model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { MatchDTO } from './match.dto';

export class RoundDTO extends Round {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  public id: uuid;

  @ApiProperty({ type: [MatchDTO] })
  @IsNotEmpty()
  public matchs: MatchDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public roundNumber: number;
}
