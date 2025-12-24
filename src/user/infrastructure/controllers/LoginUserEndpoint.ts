import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { setCookie } from "hono/cookie";
import { TOKEN_EXPIRATION_SECS } from "../../../config/domain/Consts.ts";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { LoginUser } from "../../application/use-cases/LoginUser.ts";
import { LoginUserRequestDTO } from "./dtos/LoginUserRequestDTO.ts";

export function LoginUserEnpoint(loginUser: LoginUser): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/users/login`,
    secured: false,
    handlers: [
      describeRoute({
        summary: "Logs in a new User",
        description:
          "Allows an user to log in the app. The user provides an unique id, email, username, name and password. Upon succesfull registration, user is added into the system and can log-in",
        responses: {
          201: { description: "User logged in succesfully" },
        },
        tags: [ApiTag.USER],
      }),
      validator("json", LoginUserRequestDTO),
      async (c) => {
        const { email, password } = c.req.valid("json");
        const { accessToken, refreshToken } = await loginUser.run(
          email,
          password
        );
        // Set tokens in cookie
        setCookie(c, "accessToken", accessToken, {
          httpOnly: true,
          maxAge: TOKEN_EXPIRATION_SECS.ACCESS,
        });

        setCookie(c, "refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: TOKEN_EXPIRATION_SECS.REFRESH,
        });

        c.status(201);
        return c.json({ message: "User logged in succesfully" });
      },
    ],
  };
}
