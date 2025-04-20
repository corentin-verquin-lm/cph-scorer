import { RoundProvider } from '../provider';
import { Round, RoundEntity } from '../model';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoundService implements RoundProvider {
  constructor(
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
  ) {}

  public async insert(roundNumber: number): Promise<Round> {
    const round = new RoundEntity();
    round.roundNumber = roundNumber;
    return (await this.roundRepository.save(round)).toModel();
  }

  public async getRound(roundNumber: number): Promise<Round> {
    return (
      await this.roundRepository.findOneOrFail({
        relations: [
          'matchs',
          'matchs.teamOne',
          'matchs.teamOne.players',
          'matchs.teamTwo',
          'matchs.teamTwo.players',
        ],
        where: { roundNumber },
      })
    ).toModel();
  }

  public async deleteAll(): Promise<void> {
    await this.roundRepository
      .createQueryBuilder()
      .delete()
      .from(RoundEntity)
      .execute();
  }
}
