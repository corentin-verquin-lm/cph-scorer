import { AddPlayer } from '../../src/core/add-player'
import { PlayerProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'

describe('Add player', () => {
    const mockPlayer = mock<PlayerProvider>()

    it('Should can add new player', async () => {
        const use_case = new AddPlayer(mockPlayer)
        const spy = jest.spyOn(mockPlayer, 'add')

        expect(use_case).toBeDefined()
        await use_case.execute({
            firstName: 'toto',
            lastName: 'toto'
        })
        expect(spy).toHaveBeenCalled()
    })
})