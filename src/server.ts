import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

// GET,POST, PUT, PATCH, DELETE

// plugin
app.register(transactionsRoutes, { prefix: 'transactions' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server listening on port 3333')
  })

// EcmaScript Lint -- maneira de padronizar

// ex: ; é facultativo... ' ou ""... tudo tem que estar padronizado no código inteiro.
