import { TokenRepository } from "../../../auth/domain/repositories/TokenRepository";
import { TokenPayload } from "../../../auth/domain/TokenPayload";
import { Role } from "../../../auth/domain/value-objects/Role";
import { TokenPurpose } from "../../../auth/domain/value-objects/TokenPurpose";
import { TOKEN_EXPIRATION } from "../../../config";
import { PasswordHasherRepository } from "../../../shared/password-hashing/domain/repositories/PasswordHasherRepository";
import { IncorrectPasswordError } from "../../domain/errors/IncorrectPasswordError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { User } from "../../domain/User";

export class LoginUser {
  private readonly userFinder: UserFinder;
  constructor(
    private userRepository: UserRepository,
    private passwordHasherRepository: PasswordHasherRepository,
    private tokenRepository: TokenRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userFinder.findByEmail(email);

    if (
      !(await this.passwordHasherRepository.compare(
        password,
        user.password.toPrimitives()
      ))
    ) {
      throw new IncorrectPasswordError();
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async createAccessToken(user: User) {
    const now = new Date();
    const expireDate = new Date(
      now.getTime() + TOKEN_EXPIRATION.ACCESS
    ).toISOString();

    const payload: TokenPayload = {
      userId: user.id.toPrimitives(),
      createdAt: now.toISOString(),
      expireDate,
      purpose: TokenPurpose.ACCESS_TOKEN,
      role: Role.USER,
    };

    return this.tokenRepository.sign(payload);
  }

  async createRefreshToken(user: User) {
    const now = new Date();
    const expireDate = new Date(
      now.getTime() + TOKEN_EXPIRATION.REFRESH
    ).toISOString();

    const payload: TokenPayload = {
      userId: user.id.toPrimitives(),
      createdAt: now.toISOString(),
      expireDate,
      purpose: TokenPurpose.REFRESH_TOKEN,
      role: Role.USER,
    };

    return this.tokenRepository.sign(payload);
  }
}
