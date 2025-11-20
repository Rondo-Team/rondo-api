import { UserWithEmailAlreadyExistsError } from "@/user/domain/errors/UserWithEmailAlreadyExistsError";
import { UserWithIdAlreadyExistsError } from "@/user/domain/errors/UserWithIdAlreadyExistsError";
import { UserWithUsernameAlreadyExistsError } from "@/user/domain/errors/UserWithUsernameAlreadyExistsError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserId } from "@/user/domain/value-objects/UserId";
import { UserUsername } from "@/user/domain/value-objects/UserUsername";

export class UserUniquenessChecker {
  constructor(private UserRepository: UserRepository) {}

  async ensureIdIsNotUsed(id: UserId) {
    if (await this.UserRepository.existsWithId(id))
      throw new UserWithIdAlreadyExistsError(id.toPrimitives());
  }

  async ensureEmailIsNotUsed(email: UserEmail) {
    if (await this.UserRepository.existsWithEmail(email))
      throw new UserWithEmailAlreadyExistsError(email.toPrimitives());
  }

  async ensureUsernameIsNotUsed(username: UserUsername) {
    if (
      await this.UserRepository.existsWithUsername(username)
    )
      throw new UserWithUsernameAlreadyExistsError(username.toPrimitives());
  }
}
