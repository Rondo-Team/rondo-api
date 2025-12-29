import { describeRoute } from "hono-openapi";
import { getCookie, setCookie } from "hono/cookie";
import { TOKEN_EXPIRATION_SECS } from "../../../config/domain/Consts.ts";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { RefreshToken } from "../../application/use-cases/RefreshTokens.ts";

export function RefreshTokenEndpoint(refreshToken: RefreshToken): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/refresh-token`,
    secured: false, // As we want to refresh when we don have accessToken
    handlers: [
      describeRoute({
        summary: "Refresh access and refresh tokens",
        description: "Allows an user refresh tokens.",
        responses: {
          201: { description: "Tokens refreshed succesfully" },
        },
        tags: [ApiTag.AUTH],
      }),
      async (c) => {
        const token = getCookie(c, "refreshToken");
        if (token) {
          const { newAccessToken, newRefreshToken } = await refreshToken.run(
            token
          );
          setCookie(c, "accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: TOKEN_EXPIRATION_SECS.ACCESS,
          });

          setCookie(c, "refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: TOKEN_EXPIRATION_SECS.REFRESH,
          });

          c.status(201);
          return c.json({ message: "User tokens refreshed succesfully" });
        }
        c.status(400);
        return c.json({ message: "Token not found in cookies" });
      },
    ],
  };
}
