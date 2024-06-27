export class ValidationNotValid extends Error {
  constructor(input: string | Error) {
    if (input instanceof Error) {
      super(input.message)
      Object.assign(this, input)

      this.name = 'ValidationNotValid'
    } else {
      super(input)
    }
  }
}
