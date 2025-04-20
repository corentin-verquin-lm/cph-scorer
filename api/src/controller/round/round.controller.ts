import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import {
  PlayerService,
  RoundService,
  TeamService,
  MatchService,
} from '../../service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm';
import { GenerateRound } from '../../core/generate-round';
import { MaxCallError } from '../../error';
import { RoundDTO } from '../../helper/DTO/round.dto';
import { GetRound } from '../../core/get-round';

@Controller('round')
@ApiTags('Tournament')
export class RoundController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService,
    private readonly teamService: TeamService,
    private readonly matchService: MatchService,
  ) {}

  @Post('/generate/:number/:field')
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Rounds was generated' })
  @ApiConflictResponse({
    description: 'The generation is mathematicaly imposible',
  })
  async generate(
    @Param('number') numberOfRound: number,
    @Param('field') fieldAvailable: number,
  ): Promise<void> {
    const useCase = new GenerateRound(
      this.playerService,
      this.roundService,
      this.teamService,
      this.matchService,
    );

    try {
      await useCase.execute(numberOfRound, fieldAvailable);
    } catch (e) {
      if (e instanceof MaxCallError) throw new ConflictException(e.message);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('/:round')
  @ApiOkResponse({ description: 'One round', type: RoundDTO })
  @ApiNotFoundResponse({ description: 'Round number is invalid' })
  async list(@Param('round') round: number): Promise<RoundDTO> {
    const useCase = new GetRound(this.roundService);

    try {
      return await useCase.execute(round);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Invalid round');
      }
      throw new InternalServerErrorException(e);
    }
  }
}
