import { FastifyInstance } from 'fastify'
import { knex } from '../database'

// todo plugin precisa sem async

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async (req, res) => {
    const transaction = await knex('transactions')
      .where('amount', 1000)
      .select('*')

    return transaction
  })
}
