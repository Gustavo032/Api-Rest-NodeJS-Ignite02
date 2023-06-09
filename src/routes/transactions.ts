import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto, { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checksessionIdExists } from '../middlewares/check-session-id-exists'

// todo plugin precisa sem async

//  tipagem do req principal => tem que ser feito por schema do knex para
// {
// 	title: string,
// 	amount: number,
// 	type: 'credit' | 'debit'
// }

// Cookies <=> formas de manter contexto entre requisições:
// @fastify/cookie

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })
  // hooks pra global (no contexto)
  // prehandler pra rotas especificas
  app.get(
    '/',
    {
      preHandler: [checksessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')

      // bom retornar sempre como objeto-- melhor pra adicionar e modificar informações futuramente
      return { total: transactions.length, transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checksessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checksessionIdExists],
    },

    async (req, reply) => {
      const { sessionId } = req.cookies

      const sumarry = await knex('transactions')
        .where(`session_id`, sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { sumarry }
    },
  )

  app.post('/', async (request, reply) => {
    // validação dos dados vindo da req
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // é tipo uma desestruturação usando a validação schema do zod
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      })
    }
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
