import { env } from '../../../infrastructure/env/environment'

export class HealthStatus {
  env: 'local' | 'production' | 'development' | 'staging' = env as 'local' | 'production' | 'development' | 'staging'
  status = 'ok'
}
