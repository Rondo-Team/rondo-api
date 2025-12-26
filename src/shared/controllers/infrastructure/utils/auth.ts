import type { Context } from "hono";
import type { TokenPayload } from "../../../../auth/domain/TokenPayload.ts";

export function getAuthenticatedUserId(c: Context) {
  const payload = c.get("jwtPayload") as TokenPayload;
  return payload.sub;
}
