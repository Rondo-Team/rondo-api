import { UserNotFoundByEmailError } from "@/User/domain/errors/UserNotFoundByEmailError";
import { UserNotFoundByIdError } from "@/User/domain/errors/UserNotFoundByIdError";
import { UserRepository } from "@/User/domain/repositories/UserRepository";
import { UserEmail } from "@/User/domain/value-objects/UserEmail";
import { UserId } from "@/User/domain/value-objects/UserId";

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
