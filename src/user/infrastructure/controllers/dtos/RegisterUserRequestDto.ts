import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { USER_NAME_CHAR_LOWER_LIMIT, USER_NAME_CHAR_UPPER_LIMIT, USERNAME_CHAR_LOWER_LIMIT, USERNAME_CHAR_UPPER_LIMIT } from "../../../../config/domain/Consts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z)
export const RegisterUserRequestDto = z.object(
  {
    id: z.string().uuid().openapi({ example: MANOLO_LOPEZ.id }),
    email: z.string().email().openapi({ example: MANOLO_LOPEZ.email }),
    username: z.string().min(USERNAME_CHAR_LOWER_LIMIT).max(USERNAME_CHAR_UPPER_LIMIT).openapi({ example: MANOLO_LOPEZ.username }),
    name: z.string().min(USER_NAME_CHAR_LOWER_LIMIT).max(USER_NAME_CHAR_UPPER_LIMIT).openapi({ example: MANOLO_LOPEZ.name }),
    password: z.string().min(8).openapi({ example: MANOLO_LOPEZ.password })
  }
).openapi({
  description: "Data necesary to create an user. Needs to be provided an id, email, username, name and password."
})