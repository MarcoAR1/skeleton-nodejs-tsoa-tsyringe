import { IPayload } from '../payload/IPayload'

export interface IUseCase<Payload, Response> {
  execute(payload: IPayload<Payload>): Promise<Response>
}
