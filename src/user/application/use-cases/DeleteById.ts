import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError.ts";
import { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async run(id: string): Promise<void> {
    if (!(await this.userRepository.existsWithId(new UserId(id))))
      throw new UserNotFoundByIdError(id);

    return this.userRepository.deleteById(new UserId(id));
  }
}
