import { contentsRoutes } from "@/modules/contents/http/contents.routes";
import type { FastifyInstance } from "fastify";

export const appV1Routes = async (app: FastifyInstance) => {
  contentsRoutes(app);
};
