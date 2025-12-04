import { UserWithEmailAlreadyExistsError } from "../errors/UserWithEmailAlreadyExistsError.ts";
import { UserWithIdAlreadyExistsError } from "../errors/UserWithIdAlreadyExistsError.ts";
import { UserWithUsernameAlreadyExistsError } from "../errors/UserWithUsernameAlreadyExistsError.ts";
import type { UserRepository } from "../repositories/UserRepository.ts";
import { UserEmail } from "../value-objects/UserEmail.ts";
import { UserId } from "../value-objects/UserId.ts";
import { UserUsername } from "../value-objects/UserUsername.ts";

export class UserUniquenessChecker {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async ensureIdIsNotUsed(id: UserId) {
    if (await this.UserRepository.existsWithId(id))
      throw new UserWithIdAlreadyExistsError(id.toPrimitives());
  }

  async ensureEmailIsNotUsed(email: UserEmail) {
    if (await this.UserRepository.existsWithEmail(email))
      throw new UserWithEmailAlreadyExistsError(email.toPrimitives());
  }

  async ensureUsernameIsNotUsed(username: UserUsername) {
    if (await this.UserRepository.existsWithUsername(username))
      throw new UserWithUsernameAlreadyExistsError(username.toPrimitives());
  }
}
