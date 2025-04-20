import { TeamProvider, PlayerProvider, RoundProvider } from '../provider';

export class Reset {
  constructor(
    private readonly playerProvider: PlayerProvider,
    private readonly teamProvider: TeamProvider,
    private readonly roundProvider: RoundProvider,
  ) {}

  public async execute(): Promise<void> {
    const players = await this.playerProvider.listRegister();

    await Promise.all(
      players.map(async (player) => {
        player.register = false;
        return await this.playerProvider.update(player.id, player);
      }),
    );

    await this.teamProvider.deleteAll();
    await this.roundProvider.deleteAll();
  }
}
