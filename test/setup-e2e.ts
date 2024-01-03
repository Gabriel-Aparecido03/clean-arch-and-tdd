/* eslint-disable prettier/prettier */
import { DomainEvents } from '@/core/events/domain-events'
import { envSchema } from '@/infra/env/env'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { config } from 'dotenv'
import { Redis } from 'ioredis'

config({ path : '.env', override : true})
config({ path : '.env.test', override : true})

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host : env.REDIS_HOST,
  port : env.REDIS_PORT,
  DB : env.REDIS_DB
})

function generateUniqueDatabaseURL(schemaId: string) {

  if (env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL enviroment variable.')
  }
  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema',schemaId)
  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseURL
  DomainEvents.shouldRun = false
  execSync('npx prisma migrate deploy')
  await redis.flushdb()
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
