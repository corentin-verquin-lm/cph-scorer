import { INestApplication } from '@nestjs/common'
import { RankingHttpModule } from '../../../src/controller/ranking/ranking-http.module'
import { RankingType } from '../../../src/model'
import * as request from 'supertest'
import connection from '../connection'

let app: INestApplication

beforeAll(async () => {
  app = await connection(RankingHttpModule)
})

afterAll(async () => {
  await app.close()
})

describe('Ranking Controller', () => {
  it('GET /ranking/{type}, SEN', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/ranking/${RankingType.SEN}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(4)
  })

  it('GET /ranking/{type}, VET', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/ranking/${RankingType.VET}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(2)
  })

  it('GET /ranking/type', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/ranking/type`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body).toStrictEqual(['SEN', 'VET', 'FEM'])
  })
})