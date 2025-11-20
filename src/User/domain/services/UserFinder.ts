import { UserNotFoundByEmailError } from "@/user/domain/errors/UserNotFoundByEmailError";
import { UserNotFoundByIdError } from "@/user/domain/errors/UserNotFoundByIdError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserId } from "@/user/domain/value-objects/UserId";

export class UserFinder {
  constructor(private UserRepository: UserRepository) {}

  async findById(id: string) {
    const user = await this.UserRepository.getOneById(new UserId(id));
    if (!user) throw new UserNotFoundByIdError(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.UserRepository.getOneByEmail(new UserEmail(email));
    if (!user) throw new UserNotFoundByEmailError(email);
    return user;
  }
}
