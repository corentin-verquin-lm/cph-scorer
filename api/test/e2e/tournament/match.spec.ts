import { RankingType } from '../../../src/model'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import connection from '../connection'
import { MatchDTO } from '../../../src/helper/DTO/match.dto'
import { RoundHttpModule } from '../../../src/controller/round/round-http.module'
import { PlayerHttpModule } from '../../../src/controller/player/player-http.module'
import { MatchHttpModule } from '../../../src/controller/match/match-http.module'

let app: INestApplication
let match: MatchDTO

beforeAll(async () => {
  app = await connection(RoundHttpModule, PlayerHttpModule, MatchHttpModule)

  const { body } = await request(app.getHttpServer())
    .get('/player')

  await Promise.all(body.slice(0, 4).map((x: any) => {
    return request(app.getHttpServer())
      .post('/player/register')
      .send({ id: x.id, type: RankingType.SEN })
  }))

  await request(app.getHttpServer())
    .post('/round/generate/1/4')

  match = (await request(app.getHttpServer())
    .get('/round/1'))
    .body.matchs[0]
})

afterAll(async () => {
  await app.close()
})

describe('Match Controller', () => {
  it('PUT /, team one win', async () => {
    await request(app.getHttpServer())
      .put('/match')
      .send({
        match: match,
        type: RankingType.SEN
      })
      .set('Accept', 'application/json')
      .expect(204)
  })
})
