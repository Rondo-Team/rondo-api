import { UnauthorizedUserActionError } from "../../domain/errors/UnauthorizedUserActionError.ts";
import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class DeleteUserById {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run(toDeleteId: string, deletingId: string): Promise<void> {
    if (toDeleteId !== deletingId) throw new UnauthorizedUserActionError();

    if (!(await this.userRepository.existsWithId(new UserId(toDeleteId))))
      throw new UserNotFoundByIdError(toDeleteId);

    return this.userRepository.deleteById(new UserId(toDeleteId));
  }
}
