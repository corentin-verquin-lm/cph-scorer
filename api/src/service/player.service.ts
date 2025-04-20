import { Repository } from 'typeorm';
import { PlayerEntity, Player } from '../model';
import { PlayerProvider } from '../provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService implements PlayerProvider {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  public async list(): Promise<Player[]> {
    const res = (
      await this.playerRepository.find({
        select: ['firstName', 'lastName', 'register', 'id'],
      })
    ).map((x) => x.toModel());

    return res;
  }

  public async add(player: Partial<Player>): Promise<Player> {
    const p = new PlayerEntity().fromModel(player as Player);

    return (await this.playerRepository.save(p)).toModel();
  }

  public async listRegister(): Promise<Player[]> {
    const res = (
      await this.playerRepository.find({
        select: ['firstName', 'lastName', 'register', 'id'],
        where: { register: true },
      })
    ).map((x) => x.toModel());

    return res;
  }

  public async update(id: uuid, player: Partial<Player>): Promise<Player> {
    const p = await this.playerRepository.findOne({
      select: ['firstName', 'lastName', 'register', 'id'],
      where: { id },
    });

    if (p === null || p === undefined) return null as any;

    return (
      await this.playerRepository.save(Object.assign(p, player))
    ).toModel();
  }
}
