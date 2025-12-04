import { UsernameAndNewUsernameAreEqualError } from "../../domain/errors/UsernameAndNewUsernameAreEqualError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserUsername } from "../../domain/value-objects/UserUsername.ts";

export class ChangeEmail {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newUsername: string): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));

    if (user.username === new UserUsername(newUsername))
      throw new UsernameAndNewUsernameAreEqualError(newUsername);

    await this.userUniquenessChecker.ensureUsernameIsNotUsed(
      new UserUsername(newUsername)
    );
    await user.changeUsername(new UserUsername(newUsername));

    return this.userRepository.edit(user);
  }
}
