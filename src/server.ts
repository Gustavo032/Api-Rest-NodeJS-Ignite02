import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

// GET,POST, PUT, PATCH, DELETE
app.get('/hello', async (req, res) => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server listening on port 3333')
  })

// EcmaScript Lint -- maneira de padronizar

// ex: ; é facultativo... ' ou ""... tudo tem que estar padronizado no código inteiro.
