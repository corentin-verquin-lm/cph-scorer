import { RankingType } from '../../model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

export class RegisterPlayerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  public id: uuid;

  @ApiProperty({
    enum: RankingType,
  })
  @IsNotEmpty()
  @IsEnum(RankingType)
  public type: RankingType;
}
