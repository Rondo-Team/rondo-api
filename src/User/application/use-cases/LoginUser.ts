import { TokenRepository } from "../../../shared/auth/domain/repositories/TokenRepository";
import { PasswordHasherRepository } from "../../../shared/password-hashing/domain/repositories/PasswordHasherRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { User } from "../../domain/User";

export class RegisterUser {
  private readonly userFinder: UserFinder;
  constructor(
    private userRepository: UserRepository,
    private passwordHasherRepository: PasswordHasherRepository,
    private tokenRepository: TokenRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(email: string, password: string): Promise<void> {
    // We find the user by email
    // We compare passwords
    // If password is correct, we generate token and return it
  }

  async createAccessToken(user: User) {
    // Set payload and sign token
  }

  async createRefreshToken(user: User) {}
}
