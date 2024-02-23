import type { AppError } from '../errors/app-error'

export interface UseCaseResponse<R> {
  result?: R
  failed?: AppError
}

export abstract class UseCase<P = unknown, R = unknown> {
  protected abstract perform (params: P): Promise<UseCaseResponse<R>>

  async execute (params: P): Promise<UseCaseResponse<R>> {
    const operation = await this.perform(params)

    if (operation?.failed) {
      return { failed: operation.failed }
    }

    return { result: operation.result }
  }

  protected caseFailed (error: AppError): UseCaseResponse<AppError> {
    return {
      failed: error
    }
  }

  protected casePassed<R = unknown>(body: any): UseCaseResponse<R> {
    return {
      result: body
    }
  }
}
