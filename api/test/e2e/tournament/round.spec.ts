import { INestApplication } from '@nestjs/common'
import { PlayerHttpModule } from '../../../src/controller/player/player-http.module'
import { RoundHttpModule } from '../../../src/controller/round/round-http.module'
import { RankingType } from '../../../src/model'
import * as request from 'supertest'
import connection from '../connection'

let app: INestApplication


beforeAll(async () => {
  app = await connection(RoundHttpModule, PlayerHttpModule)

  const { body } = await request(app.getHttpServer())
    .get('/player')

  await Promise.all(body.slice(0,4).map((x: any) => {
    return request(app.getHttpServer())
      .post('/player/register')
      .send({ id: x.id, type: RankingType.SEN })
  }))
})

afterAll(async () => {
  await app.close()
})

describe('Round Controller', () => {
  it('POST /generate/:number, try generate impossible number of round', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/round/generate/4/4')
      .set('Accept', 'application/json')
      .expect(409)

    expect(body).toStrictEqual({ statusCode: 409, message: 'Max 50 call reach', error: 'Conflict' })
  })

  it('POST /generate/:number, try generate possible number of round', async () => {
    await request(app.getHttpServer())
      .post('/round/generate/3/4')
      .set('Accept', 'application/json')
      .expect(201)
  })

  it('GET /:round', async ()=>{
    const { body } = await request(app.getHttpServer())
      .get('/round/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

      expect(body).not.toBeNull()
  })

  it('GET /:round, invalid round number', async ()=>{
    const { body } = await request(app.getHttpServer())
      .get('/round/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)

      expect(body).toStrictEqual({ statusCode: 404, message: 'Invalid round', error: 'Not Found' })
  })
})