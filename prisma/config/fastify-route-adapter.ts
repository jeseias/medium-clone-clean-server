import type { Controller } from "@/app/classes/controller";
import type { Http } from "@/app/protocols";
import { type FastifyReply, type FastifyRequest } from "fastify";

export const fastifyRouteAdapter = (controller: Controller) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: Http.Request = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode.toString().startsWith("2")) {
      await reply.status(httpResponse.statusCode).send(httpResponse.body);
    } else {
      console.log("==>==>", httpResponse.statusCode);
      await reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
  };
};
