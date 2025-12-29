import { USERNAME_CHANGING_COOLDOWN_MS } from "../../../config/domain/Consts.ts";
import { UsernameAndNewUsernameAreEqualError } from "../../domain/errors/UsernameAndNewUsernameAreEqualError.ts";
import { UsernameChangingCooldownError } from "../../domain/errors/UsernameChangingCooldownError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserUsername } from "../../domain/value-objects/UserUsername.ts";

export class ChangeUsername {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    toUpdateId: string,
    newUsername: string,
    cooldownTime: number = USERNAME_CHANGING_COOLDOWN_MS
  ): Promise<void> {
    const user = await this.userFinder.findById(new UserId(toUpdateId));

    if (!this.canChange(user.usernameChangedAt.toPrimitives(), cooldownTime))
      throw new UsernameChangingCooldownError();

    if (user.username === new UserUsername(newUsername))
      throw new UsernameAndNewUsernameAreEqualError(newUsername);

    await this.userUniquenessChecker.ensureUsernameIsNotUsed(
      new UserUsername(newUsername)
    );

    await user.changeUsername(new UserUsername(newUsername));
    return this.userRepository.edit(user);
  }

  private canChange(lastChanged: Date, cooldownTime: number) {
    return Date.now() - lastChanged.getTime() >= cooldownTime;
  }
}
