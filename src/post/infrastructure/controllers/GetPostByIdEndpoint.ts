import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetPostById } from "../../application/use-cases/GetPostById.ts";
import { PostIdParamsDTO } from "./dtos/PostIdParamsDTO.ts";

export function GetPostByIdEnpoint(getPostById: GetPostById): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/posts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets a post information",
        description:
          "Allows to get a post information by its id. The user provides an unique id.",
        responses: {
          200: { description: "Post found" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const post = await getPostById.run(id);
        c.status(200);
        return c.json(post);
      },
    ],
  };
}
