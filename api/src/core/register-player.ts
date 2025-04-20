import { PlayerProvider, RankingProvider } from '../provider';
import { RankingType, Ranking, Player } from '../model';
import { PlayerUnknowException } from '../error';

export class RegisterPlayer {
  constructor(
    private readonly playerProdvider: PlayerProvider,
    private readonly rankingProvider: RankingProvider,
  ) {}

  public async execute(id: uuid, type: RankingType): Promise<void> {
    let idRanking: uuid;
    const player: Player = await this.playerProdvider.update(id, {
      register: true,
    });

    if (player === null) throw new PlayerUnknowException(id);

    const lastRanking = await this.rankingProvider.findRanking(id, type);

    if (lastRanking === null || lastRanking === undefined) {
      idRanking = (await this.rankingProvider.createRanking(player, type)).id;
    } else {
      idRanking = lastRanking.id;
    }

    const ranking: Partial<Ranking> = {
      type,
      id: idRanking,
      participation: (lastRanking?.participation ?? 0) + 1, // eslint-disable-line
      point: lastRanking?.point ?? 0,
      goalAverage: lastRanking?.goalAverage ?? 0,
    };
    await this.rankingProvider.update(ranking.id as uuid, ranking);
  }
}
