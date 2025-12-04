import type { TokenPayload } from "../TokenPayload.ts";

export interface TokenRepository {
  // Create the token
  sign(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
}
