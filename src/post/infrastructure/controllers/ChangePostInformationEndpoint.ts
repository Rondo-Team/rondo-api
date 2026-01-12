import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import { ChangePostInformation } from "../../application/use-cases/ChangePostInformation.ts";
import { ChangePostInformationRequestDTO } from "./dtos/ChangePostInformationRequestDTO.ts";
import { PostIdParamsDTO } from "./dtos/PostIdParamsDTO.ts";

export function ChangePostInformationEndpoint(
  changePostInformation: ChangePostInformation
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/posts/:id/info`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Changes a post information",
        description:
          "Allows to change a post information. The user provides the post id through params and the new title and description through body.",
        responses: {
          200: { description: "Post updated succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostIdParamsDTO),
      validator("json", ChangePostInformationRequestDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { newTitle, newDescription } = c.req.valid("json");

        await changePostInformation.run(
          id,
          authenticatedUser,
          newTitle,
          newDescription
        );
        c.status(200);

        return c.json({ message: "Post updated succesfully" });
      },
    ],
  };
}
