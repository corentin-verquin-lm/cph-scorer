import { UpdatePlayer } from '../../src/core/update-player'
import { PlayerProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'

describe('Update player', () => {
    const mockPlayer = mock<PlayerProvider>()

    it('Should can update player', async () => {
        const use_case = new UpdatePlayer(mockPlayer)
        const spy = jest.spyOn(mockPlayer, 'update')

        expect(use_case).toBeDefined()
        await use_case.execute('0-0-0-0-0',{
            firstName: 'toto',
            lastName: 'toto'
        })
        expect(spy).toHaveBeenCalled()
    })
})