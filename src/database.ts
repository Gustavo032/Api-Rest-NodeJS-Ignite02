import { knex as setupKnex, Knex } from 'knex'
import 'dotenv/config'

console.log(process.env.DATABASE_URL)

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

export const config: Knex.Config = {
  client: 'sqlite', // *obrigated*
  // *obrigated* ,
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,

  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
