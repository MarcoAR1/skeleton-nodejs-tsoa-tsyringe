import { BadRequestError } from '../errors/BadRequestError'

const throwBadRequestError = (key: string | symbol) => {
  throw new BadRequestError(`invalid value ${key.toString()}`)
}
export const IsString =
  (match?: string | RegExp): PropertyDecorator =>
  (target: object, key: string | symbol) => {
    const description = Reflect.getOwnPropertyDescriptor(target, key)

    Reflect.defineProperty(target, key, {
      set<T>(value: T) {
        if (typeof value !== 'string') throwBadRequestError(key)
        if (typeof value === 'string' && !value.toString().match(match as string | RegExp)) throwBadRequestError(key)
        if (description?.set) {
          description.set(value)
        } else {
          Reflect.defineProperty(target, key, {
            get() {
              return value
            },
            enumerable: true
          })
        }
      },
      configurable: true
    })
  }
