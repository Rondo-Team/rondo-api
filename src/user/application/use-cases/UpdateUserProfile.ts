import { UnauthorizedUserActionError } from "../../domain/errors/UnauthorizedUserActionError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserName } from "../../domain/value-objects/UserName.ts";
import { UserProfilePicture } from "../../domain/value-objects/UserProfilePicture.ts";

export class UpdateUserProfile {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    toUpdateId: string,
    updaterId: string,
    newName: string,
    newProfilePicture: string
  ): Promise<void> {
    if (toUpdateId !== updaterId) throw new UnauthorizedUserActionError();

    const user = await this.userFinder.findById(new UserId(toUpdateId));

    await user.changeName(new UserName(newName));
    await user.changeProfilePicture(new UserProfilePicture(newProfilePicture));

    return this.userRepository.edit(user);
  }
}
