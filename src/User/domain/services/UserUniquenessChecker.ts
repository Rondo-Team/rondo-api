import { UserWithEmailAlreadyExistsError } from "@/User/domain/errors/UserWithEmailAlreadyExistsError";
import { UserWithIdAlreadyExistsError } from "@/User/domain/errors/UserWithIdAlreadyExistsError";
import { UserWithUsernameAlreadyExistsError } from "@/User/domain/errors/UserWithUsernameAlreadyExistsError";
import { UserRepository } from "@/User/domain/repositories/UserRepository";
import { UserEmail } from "@/User/domain/value-objects/UserEmail";
import { UserId } from "@/User/domain/value-objects/UserId";
import { UserUsername } from "@/User/domain/value-objects/UserUsername";

export class UserUniquenessChecker {
  constructor(private UserRepository: UserRepository) {}

  async ensureIdIsNotUsed(id: string) {
    if (await this.UserRepository.existsWithId(new UserId(id)))
      throw new UserWithIdAlreadyExistsError(id);
  }

  async ensureEmailIsNotUsed(email: string) {
    if (
      await this.UserRepository.existsWithEmail(new UserEmail(email))
    )
      throw new UserWithEmailAlreadyExistsError(email);
  }

  async ensureUsernameIsNotUsed(username: string) {
    if (
      await this.UserRepository.existsWithUsername(
        new UserUsername(username)
      )
    )
      throw new UserWithUsernameAlreadyExistsError(username);
  }
}
