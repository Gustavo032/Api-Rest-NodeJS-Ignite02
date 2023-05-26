import 'dotenv/config'
import { z } from 'zod'

// process.env

// schema == formato de dado
// temos o yup, zod, joi
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid environment variable!', _env.error.format())

  throw new Error('invalid environment variable')
}
// restante vai continuar executando

export const env = _env.data
