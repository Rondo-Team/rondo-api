import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreateDraft } from "../../application/use-cases/CreateDraft.ts";
import { CreateDraftRequestDTO } from "./dtos/CreateDraftRequestDTO.ts";

export function CreateDraftEndpoint(createDraft: CreateDraft): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/drafts`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a new draft",
        description:
          "Allows to create a new draft. The user provides an unique id, title, description and play.",
        responses: {
          201: { description: "Draft created succesfully" },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("json", CreateDraftRequestDTO),
      async (c) => {
        const { id, title, description, play } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createDraft.run(
          id,
          authenticatedUser,
          title,
          description,
          new Date(),
          play
        );
        c.status(201);
        return c.json({ message: "Draft created succesfully" });
      },
    ],
  };
}
