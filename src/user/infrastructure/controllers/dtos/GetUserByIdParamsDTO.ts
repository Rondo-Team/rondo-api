import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const GetUserByIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: MANOLO_LOPEZ.id }),
  })
  .openapi({
    description:
      "Data necesary to get an user information. Needs to be provided an id.",
  });
