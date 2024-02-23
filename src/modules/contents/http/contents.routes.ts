import type { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "prisma/config/fastify-route-adapter";
import { makeCreateContentController } from "./controllers";

export const contentsRoutes = (app: FastifyInstance) => {
  const ROUTE = "/contents" as const;

  app.post(
    ROUTE,
    {
      schema: {
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            body: { type: "string" },
          },
        },
      },
    },
    fastifyRouteAdapter(makeCreateContentController())
  );
};
