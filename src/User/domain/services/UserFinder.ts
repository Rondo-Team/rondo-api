import { UserNotFoundByEmailError } from "../errors/UserNotFoundByEmailError";
import { UserNotFoundByIdError } from "../errors/UserNotFoundByIdError";
import { UserRepository } from "../repositories/UserRepository";
import { UserEmail } from "../value-objects/UserEmail";
import { UserId } from "../value-objects/UserId";

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
