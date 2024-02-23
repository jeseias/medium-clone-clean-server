import { AppError } from ".";

export class ServerError extends AppError {
  constructor() {
    super({
      name: "ServerError",
      message: "Interval server error, please try again later",
      code: 500,
    });
  }
}
