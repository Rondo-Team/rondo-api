import { TokenPayload } from "../TokenPayload"

export interface TokenRepository {
  // Create the token
  sign(payload: TokenPayload): Promise<string>
  verify(token: string): Promise<TokenPayload>
}