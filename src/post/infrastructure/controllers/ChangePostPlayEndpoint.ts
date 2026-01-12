import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import { ChangePostPlay } from "../../application/use-cases/ChangePostPlay.ts";
import { ChangePostPlayRequestDTO } from "./dtos/ChangePostPlayRequestDTO.ts";
import { PostIdParamsDTO } from "./dtos/PostIdParamsDTO.ts";

export function ChangePostPlayEndpoint(
  changePostPlay: ChangePostPlay
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/posts/:id/play`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Changes a post play",
        description:
          "Allows to change a post play. The user provides the post id through params and the new play through body.",
        responses: {
          200: { description: "Play changed" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostIdParamsDTO),
      validator("json", ChangePostPlayRequestDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { newPlay } = c.req.valid("json");

        await changePostPlay.run(id, authenticatedUser, newPlay);
        c.status(200);

        return c.json({ message: "Play changed succesfully" });
      },
    ],
  };
}
