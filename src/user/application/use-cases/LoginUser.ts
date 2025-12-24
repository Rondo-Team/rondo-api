import type { TokenRepository } from "../../../auth/domain/repositories/TokenRepository.ts";
import type { TokenPayload } from "../../../auth/domain/TokenPayload.ts";
import { Role } from "../../../auth/domain/value-objects/Role.ts";
import { TokenPurpose } from "../../../auth/domain/value-objects/TokenPurpose.ts";
import { TOKEN_EXPIRATION_SECS } from "../../../config/domain/Consts.ts";
import type { PasswordHasherRepository } from "../../../shared/password-hashing/domain/repositories/PasswordHasherRepository.ts";
import { IncorrectPasswordError } from "../../domain/errors/IncorrectPasswordError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { User } from "../../domain/User.ts";
import { UserEmail } from "../../domain/value-objects/UserEmail.ts";

export class LoginUser {
  private userRepository: UserRepository;
  private passwordHasherRepository: PasswordHasherRepository;
  private tokenRepository: TokenRepository;
  private readonly userFinder: UserFinder;
  constructor(
    userRepository: UserRepository,
    passwordHasherRepository: PasswordHasherRepository,
    tokenRepository: TokenRepository
  ) {
    this.userRepository = userRepository;
    this.passwordHasherRepository = passwordHasherRepository;
    this.tokenRepository = tokenRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userFinder.findByEmail(new UserEmail(email));

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
    const now = Math.floor(Date.now() / 1000);
    const expireDate = now + TOKEN_EXPIRATION_SECS.ACCESS;

    const payload: TokenPayload = {
      sub: user.id.toPrimitives(),
      iat: now,
      exp: expireDate,
      purpose: TokenPurpose.ACCESS_TOKEN,
      role: Role.USER,
    };

    return this.tokenRepository.sign(payload);
  }

  async createRefreshToken(user: User) {
    const now = Math.floor(Date.now() / 1000);
    const expireDate = now + TOKEN_EXPIRATION_SECS.REFRESH;

    const payload: TokenPayload = {
      sub: user.id.toPrimitives(),
      iat: now,
      exp: expireDate,
      purpose: TokenPurpose.REFRESH_TOKEN,
      role: Role.USER,
    };

    return this.tokenRepository.sign(payload);
  }
}
