import { RankingProvider, TeamProvider } from '../provider';
import { Match, Player, RankingType, Team } from '../model';

export class UpdateScore {
  constructor(
    private readonly rankingProvider: RankingProvider,
    private readonly teamProvider: TeamProvider,
  ) {}

  public async execute(match: Match, type: RankingType): Promise<void> {
    await Promise.all([
      this.teamProvider.update(match.teamOne.id, match.teamOne.score),
      this.teamProvider.update(match.teamTwo.id, match.teamTwo.score),
    ]);

    if (Number.parseInt(match.teamOne.score as any, 10) === 13) {
      await Promise.all([
        this.update(
          match.teamOne,
          match.teamOne.score - match.teamTwo.score,
          3,
          type,
        ),
        this.update(
          match.teamTwo,
          match.teamTwo.score - match.teamOne.score,
          1,
          type,
        ),
      ]);
    } else {
      await Promise.all([
        this.update(
          match.teamTwo,
          match.teamTwo.score - match.teamOne.score,
          3,
          type,
        ),
        this.update(
          match.teamOne,
          match.teamOne.score - match.teamTwo.score,
          1,
          type,
        ),
      ]);
    }
  }

  private async update(
    team: Team,
    goalAverage: number,
    point: number,
    type: RankingType,
  ): Promise<void> {
    const ranks = await Promise.all(
      team.players.map(async (player: Player) => {
        return await this.rankingProvider.findRanking(player.id, type);
      }),
    );

    ranks.map((rank) => {
      if (rank !== null) {
        rank.point += point;
        rank.goalAverage += goalAverage;
      }
      return rank;
    });

    await Promise.all(
      ranks.map(async (rank) => {
        if (rank !== null) {
          return await this.rankingProvider.update(rank.id, rank);
        }
      }),
    );
  }
}
