import { env } from './env'
import { app } from './app'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('http server listening on port 3333')
  })

// EcmaScript Lint -- maneira de padronizar

// ex: ; é facultativo... ' ou ""... tudo tem que estar padronizado no código inteiro.
