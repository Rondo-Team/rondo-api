import { TokenRepository } from "@/auth/domain/repositories/TokenRepository";
import { TokenPayload } from "@/auth/domain/TokenPayload";
import { TokenPurpose } from "@/auth/domain/value-objects/TokenPurpose";
import { TOKEN_EXPIRATION } from "@/config/domain/Consts";

export class RefreshToken {
  constructor(private tokenRepository: TokenRepository) {}
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
