import { TOKEN_EXPIRATION } from "../../../config/domain/Consts.ts";
import type { TokenRepository } from "../../domain/repositories/TokenRepository.ts";
import type { TokenPayload } from "../../domain/TokenPayload.ts";
import { TokenPurpose } from "../../domain/value-objects/TokenPurpose.ts";

export class RefreshToken {
  private tokenRepository: TokenRepository
  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository
  }
  async run(refreshToken: string) {
    const now = new Date();
    const accessTokenExp = new Date(
      now.getTime() + TOKEN_EXPIRATION.ACCESS
    ).toISOString();
    const refreshTokenExp = new Date(
      now.getTime() + TOKEN_EXPIRATION.REFRESH
    ).toISOString();

    const payload = await this.tokenRepository.verify(refreshToken);

    const newAccessTokenPayload: TokenPayload = {
      userId: payload.userId,
      createdAt: now.toISOString(),
      expireDate: accessTokenExp,
      purpose: TokenPurpose.ACCESS_TOKEN,
      role: payload.role,
    };

    const newRefreshTokenPayload: TokenPayload = {
      userId: payload.userId,
      createdAt: now.toISOString(),
      expireDate: refreshTokenExp,
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
