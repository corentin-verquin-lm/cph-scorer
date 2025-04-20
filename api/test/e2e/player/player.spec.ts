import { INestApplication } from '@nestjs/common'
import * as request from 'supertest';
import connection from '../connection'
import { RankingType } from '../../../src/model'
import { PlayerHttpModule } from '../../../src/controller/player/player-http.module'

let app: INestApplication
let player: any

const payload = {
  firstName: 'toto',
  lastName: 'tata'
}

beforeAll(async () => {
  app = await connection(PlayerHttpModule)
})

afterAll(async () => {
  await app.close()
})

describe('Player Controller', () => {
  it('GET /player', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/player')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(16)

    player = body[0]
  })

  it('PUT /player/:id', async () => {
    const { body } = await request(app.getHttpServer())
      .put(`/player/${player.id}`)
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body).toStrictEqual({ ...payload, id: player.id, register: false })
  })

  it('PUT /player/:id, try update a fake user', async () => {
    const { body } = await request(app.getHttpServer())
      .put('/player/c47050f8-ca68-410f-8182-837c1840ab15')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(404)

    expect(body).toStrictEqual({ statusCode: 404, message: 'Invalid user', error: 'Not Found' })
  })

  it('POST /player', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/player')
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.firstName).toBe('toto')
    expect(body.lastName).toBe('tata')
    expect(body.register).toBe(false)
  })

  it('POST /player/register VET', async () => {
    const { body } =
    await request(app.getHttpServer())
      .post('/player/register')
      .set('Accept', 'application/json')
      .send({ id: player.id, type: RankingType.VET })
      .expect(204)
  })

  it('POST /player/register, try register a fake user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/player/register')
      .set('Accept', 'application/json')
      .send({ id: 'c47050f8-ca68-410f-8182-837c1840ab15', type: RankingType.VET })
      .expect(404)

    expect(body).toStrictEqual({ statusCode: 404, message: 'Invalid user', error: 'Not Found' })
  })

  it('POST /player/register SEN', async () => {
    await request(app.getHttpServer())
      .post('/player/register')
      .set('Accept', 'application/json')
      .send({ id: player.id, type: RankingType.SEN })
      .expect(204)
  })

  it('GET /player/register', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/player/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(1)
    expect(body[0].id).toBe(player.id)
  })
})