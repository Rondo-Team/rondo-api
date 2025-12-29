import { TOKEN_EXPIRATION_SECS } from "../../../config/domain/Consts.ts";
import type { TokenRepository } from "../../domain/repositories/TokenRepository.ts";
import type { TokenPayload } from "../../domain/TokenPayload.ts";
import { TokenPurpose } from "../../domain/value-objects/TokenPurpose.ts";

export class RefreshToken {
  private tokenRepository: TokenRepository;
  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }
  async run(refreshToken: string) {
    const now = Math.floor(Date.now() / 1000);
    const accessTokenExp = now + TOKEN_EXPIRATION_SECS.ACCESS;
    const refreshTokenExp = now + TOKEN_EXPIRATION_SECS.REFRESH;

    const payload = await this.tokenRepository.verify(refreshToken);

    const newAccessTokenPayload: TokenPayload = {
      sub: payload.sub,
      iat: now,
      exp: accessTokenExp,
      purpose: TokenPurpose.ACCESS_TOKEN,
      role: payload.role,
    };

    const newRefreshTokenPayload: TokenPayload = {
      sub: payload.sub,
      iat: now,
      exp: refreshTokenExp,
      purpose: TokenPurpose.REFRESH_TOKEN,
      role: payload.role,
    };

    const newAccessToken = await this.tokenRepository.sign(
      newAccessTokenPayload
    );
    const newRefreshToken = await this.tokenRepository.sign(
      newRefreshTokenPayload
    );

    return { newAccessToken, newRefreshToken };
  }
}
