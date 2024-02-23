import { AppError } from "../errors/app-error";

export interface Validator {
  validate(): Promise<AppError | undefined>;
}
