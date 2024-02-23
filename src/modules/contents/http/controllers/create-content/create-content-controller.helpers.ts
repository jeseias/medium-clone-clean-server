import type { Http } from "@/app/protocols";
import { ZodObjectValidation } from "@/app/validations/zod-object-validation";
import { z } from "zod";

export namespace ICreateContentController {
  export interface Body {
    title: string;
    body: string;
    coverImage?: string;
    image?: string;
  }

  export type Req = Http.Request<Body>;
}

const validation = z.object({
  body: z.string(),
  title: z.string(),
  coverImage: z.string().optional(),
  image: z.string().optional(),
});

export const makeUpdateFolderControllerValidation = (
  req: ICreateContentController.Req
) => new ZodObjectValidation(validation, {
  title: req.body?.title,
  body: req.body?.body,
  coverImage: req.body?.coverImage,
  image: req.body?.image,
} as ICreateContentController.Body);
