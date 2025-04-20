import { Reset } from '../../src/core/reset'
import { PlayerProvider, RoundProvider, TeamProvider } from '../../src/provider'
import { mock } from 'jest-mock-extended'
import { Player } from '../../src/model'

describe('Reset', () => {
    const mockPlayer = mock<PlayerProvider>()
    const mockTeam = mock<TeamProvider>()
    const mockRound = mock<RoundProvider>()
    mockPlayer.listRegister.calledWith().mockReturnValue([
        new Player({ id: '0-0-0-0-0', register: true })
    ] as any)

    it('Should can reset tournament', async () => {
        const use_case = new Reset(mockPlayer, mockTeam, mockRound)
        const spyList = jest.spyOn(mockPlayer, 'listRegister')
        const spyUpdate = jest.spyOn(mockPlayer, 'update')
        const spyTeam = jest.spyOn(mockTeam, 'deleteAll')
        const spyRound = jest.spyOn(mockRound, 'deleteAll')

        expect(use_case).toBeDefined()
        await use_case.execute()
        expect(spyList).toHaveBeenCalled()
        expect(spyUpdate).toBeCalledWith('0-0-0-0-0', { id: '0-0-0-0-0', register: false })
        expect(spyTeam).toHaveBeenCalled()
        expect(spyRound).toHaveBeenCalled()
    })
})