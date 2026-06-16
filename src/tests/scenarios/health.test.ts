import { describe, expect, it } from 'vitest'
import httpStatus from 'http-status'
import supertest from 'supertest'
import { HealthStatusMock } from '../mocks/HealthStatus.mock'
import { TestServerInstance } from './helpers/testServer'

describe('Health endpoint', () => {
  it('Health check ok', async () => {
    const res = await supertest(TestServerInstance).get('/health/status')
    expect(res.status).toEqual(httpStatus.OK)
    expect(res.body).toEqual(HealthStatusMock)
  })
})
