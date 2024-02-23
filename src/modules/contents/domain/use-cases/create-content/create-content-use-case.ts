import type { ContentRepository } from "../../repositories";
import type { ICreateContentUseCase } from "./create-content-use-case.types";
import { UseCase, type UseCaseResponse } from "@/app/classes";

export class CreateContentUseCase extends UseCase<
  ICreateContentUseCase.Params,
  ICreateContentUseCase.Response
> {
  constructor(private readonly contentRepository: ContentRepository) {
    super();
  }

  async perform(
    params: ICreateContentUseCase.Params,
  ): Promise<UseCaseResponse<ICreateContentUseCase.Response>> {
    const content = await this.contentRepository.create(params);

    return this.casePassed({ content });
  }
}
