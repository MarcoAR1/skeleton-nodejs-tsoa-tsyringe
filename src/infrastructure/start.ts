import 'express-async-errors'
import path from 'node:path'
import dotenv from 'dotenv'
import { env } from './env/environment'
dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) }).parsed
import { Skeleton } from './Skeleton'

try {
  new Skeleton().start()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
