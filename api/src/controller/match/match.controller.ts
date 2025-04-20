import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { RankingService, TeamService } from '../../service';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MatchUpdateDTO } from '../../helper/DTO/match-update.dto';
import { UpdateScore } from '../../core/update-score';
import { PlayerUnknowException } from '../../error';

@Controller('match')
@ApiTags('Tournament')
export class MatchController {
  constructor(
    private readonly teamService: TeamService,
    private readonly rankingService: RankingService,
  ) {}

  @Put('/')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Match updated' })
  @ApiNotFoundResponse({ description: 'Player is unknow' })
  async updateScore(@Body() { match, type }: MatchUpdateDTO): Promise<void> {
    const useCase = new UpdateScore(this.rankingService, this.teamService);

    try {
      await useCase.execute(match, type);
    } catch (e) {
      if (e instanceof PlayerUnknowException) {
        throw new NotFoundException('Invalid user');
      }
      throw new InternalServerErrorException(e);
    }
  }
}
