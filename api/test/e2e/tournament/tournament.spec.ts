import { INestApplication } from '@nestjs/common'
import { PlayerHttpModule } from '../../../src/controller/player/player-http.module'
import { RoundHttpModule } from '../../../src/controller/round/round-http.module'
import { TournamentHttpModule } from '../../../src/controller/tournament/tournament-http.module'
import { RankingType } from '../../../src/model'
import * as request from 'supertest'
import connection from '../connection'

let app: INestApplication


beforeAll(async () => {
  app = await connection(RoundHttpModule, PlayerHttpModule, TournamentHttpModule)

  const { body } = await request(app.getHttpServer())
    .get('/player')

  await Promise.all(body.slice(0,4).map((x: any) => {
    return request(app.getHttpServer())
      .post('/player/register')
      .send({ id: x.id, type: RankingType.SEN })
  }))

  await request(app.getHttpServer())
      .post('/round/generate/3')
})

afterAll(async () => {
  await app.close()
})

describe('Round Controller', () => {
  it('DELETE /tournament, reset tournament', async () => {
    await request(app.getHttpServer())
      .delete('/tournament')
      .set('Accept', 'application/json')
      .expect(204)
  })
})