import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserId } from "../../domain/value-objects/UserId";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async run(id: string): Promise<void> {
    if (!(await this.userRepository.existsWithId(new UserId(id))))
      throw new UserNotFoundByIdError(id);

    return this.userRepository.deleteById(new UserId(id));
  }
}
