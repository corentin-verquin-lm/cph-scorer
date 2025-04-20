import { Team } from '../../model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';
import { PlayerDTO } from './player.dto';

export class TeamDTO extends Team {
  @ApiProperty()
  @IsNotEmpty()
  public id: uuid;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(13)
  public score: number;

  @ApiProperty({ type: [PlayerDTO] })
  @IsNotEmpty()
  public players: PlayerDTO[];
}
