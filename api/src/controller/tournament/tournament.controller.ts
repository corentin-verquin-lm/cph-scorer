import { Reset } from '../../core/reset';
import { Controller, Delete, HttpCode } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { RoundService, PlayerService, TeamService } from '../../service';

@ApiTags('Tournament')
@Controller('tournament')
export class TournamentController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly teamService: TeamService,
    private readonly roundService: RoundService,
  ) {}

  @Delete('/')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Reset current tournament' })
  async reset(): Promise<void> {
    const useCase = new Reset(
      this.playerService,
      this.teamService,
      this.roundService,
    );

    return await useCase.execute();
  }
}
