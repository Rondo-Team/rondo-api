import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const LoginUserRequestDTO = z
  .object({
    email: z.string().email().openapi({ example: MANOLO_LOPEZ.email }),
    password: z.string().min(8).openapi({ example: MANOLO_LOPEZ.password }),
  })
  .openapi({
    description:
      "Data necesary to log in an user. Needs to be provided an email and password.",
  });
