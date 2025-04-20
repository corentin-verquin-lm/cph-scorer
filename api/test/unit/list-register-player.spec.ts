import { ListRegisterPlayer } from '../../src/core/list-register-player'
import { PlayerProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'

describe('List register player', () => {
    const mockPlayer = mock<PlayerProvider>()

    it('Should can list register player', async () => {
        const use_case = new ListRegisterPlayer(mockPlayer)
        const spy = jest.spyOn(mockPlayer, 'listRegister')

        expect(use_case).toBeDefined()
        await use_case.execute()
        expect(spy).toHaveBeenCalled()
    })
})