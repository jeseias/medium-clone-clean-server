import { ServerError, type AppError } from "../errors";
import type { Http } from "../protocols";

export const badRequest = (error: Error): Http.Response<Error> => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): Http.Response<Error> => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = <T = any>(body: T): Http.Response<T> => ({
  statusCode: 200,
  body,
});
export const created = <T = any>(body: T): Http.Response<T> => ({
  statusCode: 201,
  body,
});
export const deleted = <T = any>(): Http.Response<T> => ({
  statusCode: 204,
});

export const forbidden = (error?: AppError | Error): Http.Response<any> => ({
  statusCode: 403,
  body: error || new Error("Forbidden"),
});

export const unauthorized = (error?: unknown): Http.Response => ({
  statusCode: 401,
  body: error || { error: "Unauthorized" },
});
