import { any, mock } from 'jest-mock-extended'
import { RegisterPlayer } from '../../src/core/register-player'
import { Player, Ranking, RankingType } from '../../src/model'
import { PlayerProvider, RankingProvider } from '../../src/provider'
import { PlayerUnknowException } from '../../src/error'

describe('Register player', () => {
    const mockPlayer = mock<PlayerProvider>()
    const mockRanking = mock<RankingProvider>()

    const userId = '0-0-0-0-0'
    const rankingId = 'a-a-a-a-a'
    const participationOld = 1
    const pointOld = 10

    mockPlayer.update.calledWith(`${userId}1`,any()).mockResolvedValue(null as any)
    mockPlayer.update.calledWith(userId, any()).mockResolvedValue(new Player({ id: userId }))
    mockRanking.findRanking.calledWith(userId, RankingType.VET).mockResolvedValue(new Ranking({
        id: rankingId,
        participation: participationOld,
        type: RankingType.VET,
        goalAverage: pointOld,
        point: pointOld
    }) as any)
    mockRanking.createRanking.calledWith(any(), any()).mockResolvedValue({ 'id': rankingId } as any)

    it.each`
        rankingType         | point | participation             | title
        ${RankingType.VET}  | ${10} | ${participationOld + 1}   | ${'existent player'}
        ${RankingType.SEN}  | ${0}  | ${1}                      | ${'new player'}
    `("should can register $title", async ({ rankingType, point, participation, title }) => {
        const use_case = new RegisterPlayer(mockPlayer, mockRanking)
        const spyUpdate = jest.spyOn(mockPlayer, 'update')
        const spyFind = jest.spyOn(mockRanking, 'findRanking')
        const spyUpdateRanking = jest.spyOn(mockRanking, 'update')

        expect(use_case).toBeDefined()
        await use_case.execute(userId, rankingType)
        expect(spyUpdate).toHaveBeenCalledWith(userId, { register: true })
        expect(spyFind).toHaveBeenCalledWith(userId, rankingType)
        expect(spyUpdateRanking).toHaveBeenCalledWith(rankingId, {
            type: rankingType,
            id: rankingId,
            point: point,
            participation: participation,
            goalAverage: point
        })
    })

    it('Should can\'t register unkow Player', async()=> {
        const use_case = new RegisterPlayer(mockPlayer, mockRanking)

        expect(use_case).toBeDefined()

        return use_case.execute(`${userId}1`, RankingType.FEM).catch(e => expect(e).toBeInstanceOf(PlayerUnknowException))
    })
})