import { UpdateScore } from '../../src/core/update-score'
import { RankingProvider, TeamProvider } from '../../src/provider'
import { any, mock } from 'jest-mock-extended'
import { Match, Player, Ranking, RankingType, Team } from '../../src/model'

describe('Update score', () => {
    const mockRankig = mock<RankingProvider>()
    const mockTeam = mock<TeamProvider>()

    mockRankig.findRanking.calledWith(any(), any()).mockReturnValue(new Ranking({
        point: 10,
        goalAverage: 10,
        id: '0-0-0-0-0'
    }) as any)

    it.each`
        idTeamOne       | scoreTeamOne  | idTeamTwo     | scoreTeamTwo
        ${'0-0-0-0-0'}  | ${13}         | ${'1-1-1-1-1'}| ${10}
        ${'0-0-0-0-0'}  | ${10}         | ${'1-1-1-1-1'}| ${13}
    `('Should can update score of team', async ({ idTeamOne, scoreTeamOne, idTeamTwo, scoreTeamTwo }) => {
        const use_case = new UpdateScore(mockRankig, mockTeam)
        const spyUpdateTeam = jest.spyOn(mockTeam, 'update')
        const spyFindRanking = jest.spyOn(mockRankig, 'findRanking')
        const spyUpdateRanking = jest.spyOn(mockRankig, 'update')

        expect(use_case).toBeDefined()
        await use_case.execute(new Match({
            teamOne: teamFactory(idTeamOne, scoreTeamOne),
            teamTwo: teamFactory(idTeamTwo, scoreTeamTwo)
        }), RankingType.SEN)
        expect(spyUpdateTeam).toHaveBeenCalledWith(idTeamOne, scoreTeamOne)
        expect(spyUpdateTeam).toHaveBeenCalledWith(idTeamTwo, scoreTeamTwo)
        expect(spyFindRanking).toHaveBeenCalledTimes(4)
        expect(spyUpdateRanking).toHaveBeenCalledTimes(4)
    })
})

function teamFactory(id, score) {
    return new Team({
        id,
        score,
        players: [
            new Player({ id: `${id}1` as any }),
            new Player({ id: `${id}2` as any }),
        ]
    })
}