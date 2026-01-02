import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreatePost } from "../../application/use-cases/CreatePost.ts";
import { CreatePostRequestDTO } from "./dtos/CreatePostRequestDTO.ts";

export function CreatePostEdpoint(createPost: CreatePost): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/posts`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a new post",
        description:
          "Allows to create a new post. The user provides an unique id, title, description, tags and play.",
        responses: {
          201: { description: "Post created succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("json", CreatePostRequestDTO),
      async (c) => {
        const { id, title, description, tags, play } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createPost.run(
          id,
          authenticatedUser,
          title,
          description,
          0,
          0,
          0,
          new Date(),
          tags,
          play
        );
        c.status(201);
        return c.json({ message: "Post created succesfully" });
      },
    ],
  };
}
