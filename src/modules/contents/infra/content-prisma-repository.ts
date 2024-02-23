import { prismaClient } from "@/app/infra";
import type { ContentRepository } from "../domain/repositories";
import type { CreateContentRepository } from "../domain/repositories/create-content-repository";

export class ContentPrismaRepository implements ContentRepository {
  async create(
    params: CreateContentRepository.Params
  ): CreateContentRepository.Response {
    const content = await prismaClient.content.create({
      data: params,
    });

    return content;
  }
}


export const contentPrismaRepository = new ContentPrismaRepository();