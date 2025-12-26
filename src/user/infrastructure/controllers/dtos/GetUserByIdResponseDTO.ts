import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  UPPER_COMMENTS_LIMIT,
  UPPER_FAVOURITES_LIMIT,
  UPPER_POSTS_LIMIT,
  USER_NAME_CHAR_LOWER_LIMIT,
  USER_NAME_CHAR_UPPER_LIMIT,
  USERNAME_CHAR_LOWER_LIMIT,
  USERNAME_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const GetUserByIdResponseDTO = z
  .object({
    id: z.string().uuid().openapi({ example: MANOLO_LOPEZ.id }),
    username: z
      .string()
      .min(USERNAME_CHAR_LOWER_LIMIT)
      .max(USERNAME_CHAR_UPPER_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.username }),
    name: z
      .string()
      .min(USER_NAME_CHAR_LOWER_LIMIT)
      .max(USER_NAME_CHAR_UPPER_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.name }),
    profilePicture: z
      .string()
      .url()
      .openapi({ example: MANOLO_LOPEZ.profilePicture }),
    postsCount: z
      .number()
      .int()
      .min(0)
      .max(UPPER_POSTS_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.postsCount }),
    proposalsCount: z
      .number()
      .int()
      .min(0)
      .max(UPPER_COMMENTS_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.proposalsCount }),
    favouritePostsCount: z
      .number()
      .int()
      .min(0)
      .max(UPPER_FAVOURITES_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.favouritePostsCount }),
    commentsCount: z
      .number()
      .int()
      .min(0)
      .max(UPPER_COMMENTS_LIMIT)
      .openapi({ example: MANOLO_LOPEZ.commentsCount }),
    createdAt: z
      .date()
      .max(new Date())
      .openapi({ example: MANOLO_LOPEZ.createdAt }),
  })
  .openapi({
    description: "Information of a user",
  });
