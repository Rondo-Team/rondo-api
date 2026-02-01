import { sign, verify } from "hono/jwt";
import { config } from "../../../config/infrastructure/config.ts";
import type { TokenRepository } from "../../domain/repositories/TokenRepository.ts";
import type { TokenPayload } from "../../domain/TokenPayload.ts";

export class HonoTokenRepository implements TokenRepository {
  public static async create() {
    return new HonoTokenRepository();
  }
  constructor() {}

  sign(payload: TokenPayload): Promise<string> {
    return sign(payload, config.jwt.secret);
  }

  verify(token: string): Promise<TokenPayload> {
    return verify(token, config.jwt.secret) as Promise<TokenPayload>;
  }
}
