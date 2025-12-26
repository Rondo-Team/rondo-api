import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserAuthorizationChecker } from "../../domain/services/UserAuthorizationChecker.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class DeleteUserById {
  private userRepository: UserRepository;
  private userAuthorizationChecker: UserAuthorizationChecker;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userAuthorizationChecker = new UserAuthorizationChecker();
  }

  async run(toDeleteId: string, deletingId: string): Promise<void> {
    await this.userAuthorizationChecker.check(
      UserId.fromPrimitives(toDeleteId),
      UserId.fromPrimitives(deletingId)
    );
    if (!(await this.userRepository.existsWithId(new UserId(toDeleteId))))
      throw new UserNotFoundByIdError(toDeleteId);

    return this.userRepository.deleteById(new UserId(toDeleteId));
  }
}
