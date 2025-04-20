import { ListPlayer } from '../../src/core/list-player'
import { PlayerProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'

describe('List player', () => {
    const mockPlayer = mock<PlayerProvider>()

    it('Should can list player', async () => {
        const use_case = new ListPlayer(mockPlayer)
        const spy = jest.spyOn(mockPlayer, 'list')

        expect(use_case).toBeDefined()
        await use_case.execute()
        expect(spy).toHaveBeenCalled()
    })
})