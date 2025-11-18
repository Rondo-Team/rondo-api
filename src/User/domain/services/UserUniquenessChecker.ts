import { UserWithEmailAlreadyExistsError } from "../errors/UserWithEmailAlreadyExistsError";
import { UserWithIdAlreadyExistsError } from "../errors/UserWithIdAlreadyExistsError";
import { UserWithUsernameAlreadyExistsError } from "../errors/UserWithUsernameAlreadyExistsError";
import { UserRepository } from "../repositories/UserRepository";
import { UserEmail } from "../value-objects/UserEmail";
import { UserId } from "../value-objects/UserId";
import { UserUsername } from "../value-objects/UserUsername";

export class UserUniquenessChecker {
  constructor(private UserRepository: UserRepository) {}

  async ensureIdIsNotUsed(id: string) {
    if (await this.UserRepository.existsWithId(UserId.fromPrimitives(id)))
      throw new UserWithIdAlreadyExistsError(id);
  }

  async ensureEmailIsNotUsed(email: string) {
    if (
      await this.UserRepository.existsWithEmail(UserEmail.fromPrimitives(email))
    )
      throw new UserWithEmailAlreadyExistsError(email);
  }

  async ensureUsernameIsNotUsed(username: string) {
    if (
      await this.UserRepository.existsWithUsername(
        UserUsername.fromPrimitives(username)
      )
    )
      throw new UserWithUsernameAlreadyExistsError(username);
  }
}
