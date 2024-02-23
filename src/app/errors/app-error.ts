interface AppErrorParams {
  name: string
  message: string
  code: number
}

export class AppError extends Error {
  public override name: string
  public override message: string
  public code: number

  constructor ({ name, message, code }: AppErrorParams) {
    super(message)

    this.name = name
    this.message = message
    this.code = code
  }
}
