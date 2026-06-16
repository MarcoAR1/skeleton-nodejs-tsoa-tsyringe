import 'reflect-metadata'
import 'express-async-errors'
import path from 'node:path'
import dotenv from 'dotenv'

// Load env BEFORE importing anything that reads process.env at module load.
const env = process.env.env || process.env.NODE_ENV || 'local'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`), override: true })

import { Skeleton } from './Skeleton'
import { Logger } from './ioc/logger/Logger'

const logger = new Logger()

void new Skeleton().start().catch(handleError)

process.on('uncaughtException', err => {
  logger.error('uncaughtException', err)
  process.exit(1)
})

function handleError(e: unknown): void {
  logger.error('Failed to start application', e instanceof Error ? e : new Error(String(e)))
  process.exit(1)
}
