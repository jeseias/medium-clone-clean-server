/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, type ZodObject } from "zod";
import type { Validator } from "../protocols/validator";
import { AppError, AppErrorCodes } from "../errors";

export class ZodObjectValidation<B = unknown> implements Validator {
  constructor(
    private readonly schema: ZodObject<any>,
    private readonly input: B,
  ) {}

  async validate(): Promise<AppError | undefined> {
    try {
      this.schema.parse(this.input);
      return undefined;
    } catch (error) {
      if (error instanceof ZodError) {
        return new AppError({
          name: "ValidationError",
          code: AppErrorCodes.ValidationError,
          message: error.message,
        });
      }
      return new AppError({
        name: "ValidationError",
        code: AppErrorCodes.ValidationError,
        message: "Unknown error",
      });
    }
  }
}
