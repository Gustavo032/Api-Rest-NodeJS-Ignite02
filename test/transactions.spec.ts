import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

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

  beforeEach(() => {
    // vai rodar metodo down de todas migrations(zerar o banco de dados)
    execSync('npm run knex migrate:rollback --all')
    // rodar metodo up de novo
    execSync('npm run knex migrate:latest')
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
      .expect(201)
  })

  // jamais escrever um teste que depende de outro teste

  it('should be able to list all transactions', async () => {
    // fazer a chamada HTTP p/ criar uma nova transação
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    // fazer a chamada HTTP p/ criar uma nova transação
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionID = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionID}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get a summary of transactions', async () => {
    // fazer a chamada HTTP p/ criar uma nova transação
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    console.log(summaryResponse.body)
    console.log(summaryResponse.body.sumarry)
    console.log(
      'aksjlkajelkajsljlksjealkjslkal aaaaaaaaaaaaaaaaaa _<<<<<<ASÇELAKS',
    )

    expect(summaryResponse.body.sumarry).toEqual({
      amount: 3000,
    })
  })
})
