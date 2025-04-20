import { PickType } from '@nestjs/swagger';
import { PlayerDTO } from './player.dto';

export class UpdateInsertPlayerDto extends PickType(PlayerDTO, [
  'firstName',
  'lastName',
] as const) {}
