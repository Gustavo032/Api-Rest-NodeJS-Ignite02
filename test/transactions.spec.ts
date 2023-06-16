import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  // configurando categoria. Um novo contexto "{}"

  // beforeEach() -> antes de cada um dos teste
  // beforeAll -> antes de todos
  // afterAll -> depois de todos e tals
  beforeAll(async () => {
    await app.ready() // vai devolver o valor quando o fastify terminar de usar os plugins
  })

  afterAll(async () => {
    await app.close() // excluir a aplicação
  })
  it('should be able to create a new transaction', async () => {
    // fazer a chamada HTTP p/ criar uma nova transação
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      // espero que o código de resposta seja igual a 201
      .expect(200)
  })
})
