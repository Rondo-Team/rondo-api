import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreateComment } from "../../application/use-cases/CreateComment.ts";
import { CreateCommentRequestDTO } from "./dtos/CreateCommentRequestDTO.ts";

export function CreateCommentEndpoint(createComment: CreateComment): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/comment`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a comment",
        description:
          "Allows an user to create a comment on a post. The user provides an id, a postId, and a message",
        responses: {
          201: { description: "Comment created succesfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("json", CreateCommentRequestDTO),
      async (c) => {
        const { id, postId, message } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createComment.run(
          id,
          authenticatedUser,
          postId,
          message,
          0,
          new Date()
        );
        c.status(201);
        return c.json({ message: "Comment created succesfully" });
      },
    ],
  };
}
