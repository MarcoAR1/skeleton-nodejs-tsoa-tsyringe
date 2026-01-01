import { IPayload } from './IPayload'
import { IRequestId } from '../../shared/domain/interfaces/IRequestId'
import { IdRequest } from '../../shared/domain/entities/IdRequest'

export interface IId {
  id: string
}

export class IdRequestPayload implements IPayload<IRequestId> {
  constructor(private readonly req: IId) {}
  run(): IRequestId {
    const { id } = this.req
    return new IdRequest(id)
  }
}
