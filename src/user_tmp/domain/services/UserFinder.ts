import { UserNotFoundByEmailError } from "@/user/domain/errors/UserNotFoundByEmailError";
import { UserNotFoundByIdError } from "@/user/domain/errors/UserNotFoundByIdError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserId } from "@/user/domain/value-objects/UserId";

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
