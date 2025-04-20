import { PlayerProvider } from '../provider';
import { Player } from '../model';

export class ListRegisterPlayer {
  constructor(private readonly listRegisterPlayer: PlayerProvider) {}

  public async execute(): Promise<Player[]> {
    return await this.listRegisterPlayer.listRegister();
  }
}
