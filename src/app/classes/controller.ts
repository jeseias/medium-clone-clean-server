import { badRequest, serverError } from "../helpers";
import type { Http } from "../protocols";
import type { Validator } from "../protocols/validator";
import { ValidationComposite } from "../validations";

export abstract class Controller<Body = unknown, Params = any, Query = any> {
  abstract perform(
    httpRequest: Http.Request<Body, Params, Query>
  ): Promise<Http.Response>;

  async handle(
    httpRequest: Http.Request<Body, Params, Query>
  ): Promise<Http.Response> {
    const error = await this.validate(httpRequest);

    if (error !== undefined) return badRequest(error);

    try {
      return await this.perform(httpRequest);
    } catch (error) {
      console.log("==>==> SERVER ERROR", error);
      return serverError();
    }
  }

  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  private async validate(httpRequest: any): Promise<Error | undefined> {
    const validators = this.buildValidators(httpRequest);
    return await new ValidationComposite(validators).validate();
  }
}
