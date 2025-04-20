import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RankingService, PlayerService } from '../../service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListPlayer } from '../../core/list-player';
import { ListRegisterPlayer } from '../../core/list-register-player';
import { AddPlayer } from '../../core/add-player';
import { UpdatePlayer } from '../../core/update-player';
import { RegisterPlayer } from '../../core/register-player';
import { PlayerUnknowException } from '../../error';
import { PlayerDTO } from '../../helper/DTO/player.dto';
import { UpdateInsertPlayerDto } from '../../helper/DTO/update-insert.dto';
import { RegisterPlayerDto } from '../../helper/DTO/register-player.dto';
import { UUIDDTO } from '../../helper/DTO/uuid.dto';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly rankingService: RankingService,
  ) {}

  @Get('/')
  @ApiOkResponse({ description: 'List of all player', type: [PlayerDTO] })
  async list(): Promise<PlayerDTO[]> {
    const useCase = new ListPlayer(this.playerService);

    return await useCase.execute();
  }

  @Get('/register')
  @ApiOkResponse({
    description: 'List of all registered player',
    type: PlayerDTO,
  })
  async listRegister(): Promise<PlayerDTO[]> {
    const useCase = new ListRegisterPlayer(this.playerService);

    return await useCase.execute();
  }

  @Post('/')
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Add new player', type: PlayerDTO })
  async add(@Body() player: UpdateInsertPlayerDto): Promise<PlayerDTO> {
    const useCase = new AddPlayer(this.playerService);

    return await useCase.execute(player);
  }

  @Put('/:id')
  @ApiOkResponse({ description: 'Update one player', type: PlayerDTO })
  @ApiNotFoundResponse({ description: 'Player is unknow' })
  async update(
    @Param() { id }: UUIDDTO,
    @Body() player: UpdateInsertPlayerDto,
  ): Promise<PlayerDTO> {
    const useCase = new UpdatePlayer(this.playerService);
    const res = await useCase.execute(id, player);

    if (res === null) {
      throw new NotFoundException('Invalid user');
    }
    return res;
  }

  @Post('/register')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Player is registered' })
  @ApiNotFoundResponse({ description: 'Player is unknow' })
  async registerPlayer(@Body() data: RegisterPlayerDto): Promise<void> {
    const useCase = new RegisterPlayer(this.playerService, this.rankingService);

    try {
      await useCase.execute(data.id, data.type);
    } catch (e) {
      if (e instanceof PlayerUnknowException) {
        throw new NotFoundException('Invalid user');
      }
      throw new InternalServerErrorException(e);
    }
  }
}
