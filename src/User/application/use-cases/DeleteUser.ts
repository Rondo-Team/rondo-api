import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { UserId } from "../../domain/value-objects/UserId";

export class DeleteUser {
  private readonly userFinder: UserFinder;
  constructor(private userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string): Promise<void> {
    if (!(await this.userRepository.existsWithId(new UserId(id))))
      throw new UserNotFoundByIdError(id);

    return this.userRepository.deleteById(new UserId(id));
  }
}
