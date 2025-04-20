import { GetRanking } from '../../src/core/get-ranking'
import { RankingProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'
import { RankingType } from '../../src/model'

describe('Get ranking', () => {
    const mockRanking = mock<RankingProvider>()

    it.each`
        rankingType
        ${RankingType.FEM}
        ${RankingType.SEN}
        ${RankingType.VET}
    `("should can get '$rankingType' ranking", async ({ rankingType}) => {
        const use_case = new GetRanking(mockRanking)
        const spy = jest.spyOn(mockRanking, 'getRanking')

        expect(use_case).toBeDefined()
        await use_case.execute(rankingType)
        expect(spy).toHaveBeenCalledWith(rankingType)
    });
})