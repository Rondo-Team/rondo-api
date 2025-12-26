import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  USER_NAME_CHAR_LOWER_LIMIT,
  USER_NAME_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const UpdateUserProfileRequestDTO = z
  .object({
    name: z
      .string()
      .min(USER_NAME_CHAR_LOWER_LIMIT)
      .max(USER_NAME_CHAR_UPPER_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.name }),
    profilePicture: z
      .string()
      .url()
      .openapi({ example: MANOLO_LOPEZ.profilePicture }),
  })
  .openapi({
    description:
      "Data necesary to create an user. Needs to be provided an id, email, username, name and password.",
  });
