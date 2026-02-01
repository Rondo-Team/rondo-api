import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  USERNAME_CHAR_LOWER_LIMIT,
  USERNAME_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const ChangePasswordRequestDTO = z
  .object({
    password: z
      .string()
      .min(USERNAME_CHAR_LOWER_LIMIT)
      .max(USERNAME_CHAR_UPPER_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.password }),
    newPassword: z
      .string()
      .min(USERNAME_CHAR_LOWER_LIMIT)
      .max(USERNAME_CHAR_UPPER_LIMIT)
      .openapi({ example: `NEW${MANOLO_LOPEZ.password}` }),
  })
  .openapi({
    description:
      "Data necesary to update an user password. Needs to be provided the current and the new password.",
  });
