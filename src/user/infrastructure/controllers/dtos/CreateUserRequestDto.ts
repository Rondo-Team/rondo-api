import z from "zod";
import { USER_NAME_CHAR_LOWER_LIMIT, USER_NAME_CHAR_UPPER_LIMIT, USERNAME_CHAR_LOWER_LIMIT, USERNAME_CHAR_UPPER_LIMIT } from "../../../../config/domain/Consts.ts";

export const CreateUserRequestDto = z.object(
  {
    id: z.uuid(),
    email: z.email(),
    username: z.string().min(USERNAME_CHAR_LOWER_LIMIT).max(USERNAME_CHAR_UPPER_LIMIT),
    name: z.string().min(USER_NAME_CHAR_LOWER_LIMIT).max(USER_NAME_CHAR_UPPER_LIMIT),
    password: z.string().min(8)
  }
)