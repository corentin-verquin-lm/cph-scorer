import { Ranking, RankingType } from '../../model';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerDTO } from './player.dto';

export class RankingDTO extends Ranking {
  @ApiProperty()
  public id: uuid;

  @ApiProperty()
  public participation: number;

  @ApiProperty()
  public point: number;

  @ApiProperty()
  public goalAverage: number;

  @ApiProperty({ enum: RankingType })
  public type: RankingType;

  @ApiProperty({ type: [PlayerDTO] })
  public players: PlayerDTO[];
}
