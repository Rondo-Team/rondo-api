import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserNotFoundByIdError } from "../../domain/errors/UserNotFoundByIdError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class DeleteUserById {
  private userRepository: UserRepository;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(toDeleteId: string, deletingId: string): Promise<void> {
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(deletingId),
      UserId.fromPrimitives(toDeleteId)
    );
    if (!(await this.userRepository.existsWithId(new UserId(toDeleteId))))
      throw new UserNotFoundByIdError(toDeleteId);

    return this.userRepository.deleteById(new UserId(toDeleteId));
  }
}
