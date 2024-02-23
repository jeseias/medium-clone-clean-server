import type { Content } from "@prisma/client";

export namespace CreateContentRepository {
  export interface Params {
    title: string;
    body: string;
    coverImage?: string;
    image?: string;
  }

  export type Response = Promise<Content>;

  export interface Contract {
    create(
      params: CreateContentRepository.Params
    ): CreateContentRepository.Response;
  }
}
