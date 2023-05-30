import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import crypto from 'node:crypto'
import { knex } from '../database'

// todo plugin precisa sem async

//  tipagem do req principal => tem que ser feito por schema do knex para
// {
// 	title: string,
// 	amount: number,
// 	type: 'credit' | 'debit'
// }

export async function transactionsRoutes(app: FastifyInstance) {
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

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
