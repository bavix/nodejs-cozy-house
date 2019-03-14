import Knex from 'knex'
import { env } from './env'

const knex = Knex({
  client: env.DATABASE_CLIENT,
  connection: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME
  }
})

export default knex
