import { Controller } from "@/app/classes/controller";
import { badRequest, created } from "@/app/helpers/http-helpers";
import type { Validator } from "@/app/protocols/validator";
import { ValidationComposite } from "@/app/validations/composite";
import { CreateContentUseCase } from "@/modules/contents/domain/use-cases";
import type { Http } from "@/app/protocols";
import {
  makeUpdateFolderControllerValidation,
  type ICreateContentController,
} from "./create-content-controller.helpers";
import { contentPrismaRepository } from "@/modules/contents/infra";

export const buildCreateContentController = (useCase: CreateContentUseCase) => {
  class CreateContentController extends Controller {
    constructor(private readonly service: CreateContentUseCase) {
      super();
    }

    async perform(
      httpRequest: ICreateContentController.Req
    ): Promise<Http.Response<unknown>> {
      const operation = await this.service.execute({
        body: httpRequest.body.body,
        title: httpRequest.body.title,
        coverImage: httpRequest.body?.coverImage,
        image: httpRequest.body?.image,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return created(operation.result);
    }

    buildValidators(httpRequest: ICreateContentController.Req): Validator[] {
      return [
        new ValidationComposite([
          makeUpdateFolderControllerValidation(httpRequest),
        ]),
      ];
    }
  }

  return new CreateContentController(useCase);
};

export const makeCreateContentController = () => {
  const useCase = new CreateContentUseCase(contentPrismaRepository);
  return buildCreateContentController(useCase);
};
