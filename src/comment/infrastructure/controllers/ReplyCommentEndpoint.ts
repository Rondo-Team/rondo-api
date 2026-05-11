import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ReplyComment } from "../../application/use-cases/ReplyComment.ts";
import { ReplyCommentRequestDTO } from "./dtos/ReplyCommentRequestDTO.ts";

export function ReplyCommentEndpoint(replyComment: ReplyComment): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/comment/reply`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a comment reply",
        description:
          "Allows an user to create a reply to a comment. The user provides the parent ID, an id, a postId, and a message through the body",
        responses: {
          201: { description: "Comment reply created succesfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("json", ReplyCommentRequestDTO),
      async (c) => {
        const { id, parentId, postId, message } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await replyComment.run(
          id,
          authenticatedUser,
          postId,
          message,
          0,
          new Date(),
          parentId,
        );
        c.status(201);
        return c.json({ message: "Comment reply created succesfully" });
      },
    ],
  };
}
