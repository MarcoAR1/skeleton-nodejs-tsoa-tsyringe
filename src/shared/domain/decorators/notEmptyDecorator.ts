import { BadRequestError } from '../errors/BadRequestError'

export const NotEmpty = () => (target: object, key: string) => {
  const description = Object.getOwnPropertyDescriptor(target, key)
  Object.defineProperty(target, key, {
    set<T>(value: T) {
      if (!value || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0))
        throw new BadRequestError(`Missing ${key}`)
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
    configurable: true,
    enumerable: true
  })
}
