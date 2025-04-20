import { GenerateRound } from '../../src/core/generate-round';
import { MaxCallError } from '../../src/error';
import { Player } from '../../src/model';
import { mock, mockReset } from 'jest-mock-extended';
import {
  MatchProvider,
  PlayerProvider,
  RoundProvider,
  TeamProvider,
} from '../../src/provider';

describe('Generate round', () => {
  const mockPlayer = mock<PlayerProvider>();
  const mockRound = mock<RoundProvider>();
  const mockTeam = mock<TeamProvider>();
  const mockMatch = mock<MatchProvider>();

  const playerData = [
    new Player({ id: 'toto-toto-toto-toto-toto' }),
    new Player({ id: 'tata-tata-tata-tata-tata' }),
    new Player({ id: 'tutu-tutu-tutu-tutu-tutu' }),
    new Player({ id: 'titi-titi-titi-titi-titi' }),
  ];
  mockPlayer.listRegister.calledWith().mockResolvedValue(playerData);

  it('Should can generate 3 round with 4 player', async () => {
    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    const spy = jest.spyOn(mockRound, 'insert');

    expect(use_case).toBeDefined();
    await use_case.execute(3, 4);
    expect(spy).toHaveBeenCalled();
  });

  it("Should'nt can generate 4 round with 4 player", async () => {
    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );

    expect(use_case).toBeDefined();
    return use_case
      .execute(4, 4)
      .catch((e) => expect(e).toBeInstanceOf(MaxCallError));
  });

  it('After generated 3 round with 4 player should have 6 teams', async () => {
    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    const spy = jest.spyOn(mockTeam, 'insert');

    expect(use_case).toBeDefined();
    await use_case.execute(3, 4);
    expect(spy).toHaveBeenCalledTimes(6);
  });

  it('After generated 3 round with 4 player should have 3 matchs', async () => {
    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    const spy = jest.spyOn(mockMatch, 'insert');

    expect(use_case).toBeDefined();
    await use_case.execute(3, 4);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('Should can i generate round with odd player number', async () => {
    mockReset(mockPlayer);
    mockPlayer.listRegister
      .calledWith()
      .mockReturnValue([
        ...playerData,
        new Player({ id: 'toto-toto-toto-toto-toto2' }),
      ] as any);

    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    const spy = jest.spyOn(mockRound, 'insert');

    expect(use_case).toBeDefined();
    await use_case.execute(1, 4);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Test Tournament condition', () => {
  const mockPlayer = mock<PlayerProvider>();
  const mockRound = mock<RoundProvider>();
  const mockTeam = mock<TeamProvider>();
  const mockMatch = mock<MatchProvider>();

  const playerData: Player[] = [];
  for (let i = 0; i < 25; i++) {
    playerData.push(
      new Player({
        id: `player${i}-player${i}-player${i}-player${i}-player${i}`,
      }),
    );
  }

  it('Should generate 3 rouds, 2 matchs/round and 2 teams/matchs ', async () => {
    mockReset(mockPlayer);
    mockPlayer.listRegister
      .calledWith()
      .mockReturnValue(Promise.resolve(playerData.slice(0, 8)));

    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    expect(use_case).toBeDefined();

    const ronds = await use_case.execute(3, 4);
    expect(ronds).toHaveLength(3); // 3 rounds

    for (const round of ronds) {
      expect(round).toHaveLength(2); // 2 matchs/round
      for (const match of round) {
        expect(match).toHaveLength(2); // 2 teams/matchs
        expect(match.flat()).toHaveLength(4); // 4 players/match
      }
      expect(round.flat().flat()).toHaveLength(8); // 8 players/round
    }
  });

  it('Should generate 3 rouds, 2 matchs/round and 2 teams/matchs and 1 team with 3 players', async () => {
    mockReset(mockPlayer);
    mockPlayer.listRegister
      .calledWith()
      .mockReturnValue(Promise.resolve(playerData.slice(0, 9)));

    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    expect(use_case).toBeDefined();

    const ronds = await use_case.execute(3, 4);
    expect(ronds).toHaveLength(3); // 3 rounds

    for (const round of ronds) {
      expect(round).toHaveLength(2); // 2 matchs/round
      for (const match of round) {
        expect(match).toHaveLength(2); // 2 teams/matchs
      }
      expect(round[0][0]).toHaveLength(3); // 1 team with 3 players
      expect(round.flat().flat()).toHaveLength(9); // 9 players/round
    }
  });

  it('Should generate 3 rouds, 4 matchs/round, 4 teams of 2 players and 4 teams of 3 players ', async () => {
    mockReset(mockPlayer);
    mockPlayer.listRegister
      .calledWith()
      .mockReturnValue(Promise.resolve(playerData.slice(0, 20)));

    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    expect(use_case).toBeDefined();

    const ronds = await use_case.execute(3, 4);
    expect(ronds).toHaveLength(3); // 3 rounds

    for (const matchs of ronds) {
      expect(matchs).toHaveLength(4); // 4 matchs/round

      const teams = matchs.flat();
      expect(teams).toHaveLength(8); // 8 teams
      expect(teams.filter((t) => t.length === 2)).toHaveLength(4); // 4 teams of 2 players
      expect(teams.filter((t) => t.length === 3)).toHaveLength(4); // 4 teams of 3 players

      const players = teams.flat();
      expect(players).toHaveLength(20); // 20 players
    }
  });

  it("Should generate 3 rouds, 5 matchs/round because can't reduce number of match", async () => {
    mockReset(mockPlayer);
    mockPlayer.listRegister
      .calledWith()
      .mockReturnValue(Promise.resolve(playerData));

    const use_case = new GenerateRound(
      mockPlayer,
      mockRound,
      mockTeam,
      mockMatch,
    );
    expect(use_case).toBeDefined();

    const ronds = await use_case.execute(3, 4);
    expect(ronds).toHaveLength(3); // 3 rounds

    for (const matchs of ronds) {
      expect(matchs).toHaveLength(5); // 5 matchs/round

      const teams = matchs.flat();
      expect(teams).toHaveLength(10); // 10 teams
      expect(teams.filter((t) => t.length === 2)).toHaveLength(5); // 5 teams of 2 players
      expect(teams.filter((t) => t.length === 3)).toHaveLength(5); // 5 teams of 3 players

      const players = teams.flat();
      expect(players).toHaveLength(25); // 25 players
    }
  });
});
