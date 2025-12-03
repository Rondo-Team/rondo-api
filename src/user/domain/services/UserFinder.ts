import { UserNotFoundByEmailError } from "../errors/UserNotFoundByEmailError.ts";
import { UserNotFoundByIdError } from "../errors/UserNotFoundByIdError.ts";
import { UserRepository } from "../repositories/UserRepository.ts";
import { UserEmail } from "../value-objects/UserEmail.ts";
import { UserId } from "../value-objects/UserId.ts";

export class UserFinder {
  constructor(private UserRepository: UserRepository) {}

  async findById(id: UserId) {
    const user = await this.UserRepository.getOneById(id);
    if (!user) throw new UserNotFoundByIdError(id.toPrimitives());
    return user;
  }

  async findByEmail(email: UserEmail) {
    const user = await this.UserRepository.getOneByEmail(email);
    if (!user) throw new UserNotFoundByEmailError(email.toPrimitives());
    return user;
  }
}
