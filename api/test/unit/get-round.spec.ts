import { GetRound } from '../../src/core/get-round'
import { RoundProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'

describe('Get round', () => {
    const mockPlayer = mock<RoundProvider>()

    it('Should can add get round', async () => {
        const use_case = new GetRound(mockPlayer)
        const spy = jest.spyOn(mockPlayer, 'getRound')

        expect(use_case).toBeDefined()
        await use_case.execute(1)
        expect(spy).toHaveBeenCalledWith(1)
    })
})