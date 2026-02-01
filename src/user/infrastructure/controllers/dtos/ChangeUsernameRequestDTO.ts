import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  USERNAME_CHAR_LOWER_LIMIT,
  USERNAME_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const ChangeUsernameRequestDTO = z
  .object({
    newUsername: z
      .string()
      .min(USERNAME_CHAR_LOWER_LIMIT)
      .max(USERNAME_CHAR_UPPER_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.username }),
  })
  .openapi({
    description:
      "Data necesary to update an user username. Needs to be provided the new username.",
  });
