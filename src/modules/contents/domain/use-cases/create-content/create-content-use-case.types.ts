import type { Content } from "@prisma/client";
import type { CreateContentRepository } from "../../repositories/create-content-repository";

export namespace ICreateContentUseCase {
  export type Params = CreateContentRepository.Params;

  export interface Response {
    content: Content;
  }
}
