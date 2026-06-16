import { Controller, Route, Get, Tags } from 'tsoa'
import { HealthStatus } from '../domain/HealthStatus'
import { injectable, singleton } from 'tsyringe'

@injectable()
@singleton()
@Tags('Health')
@Route('/health')
export class HealthController extends Controller {
  @Get('/status')
  public async checkStatus(): Promise<HealthStatus> {
    return new HealthStatus()
  }
}
