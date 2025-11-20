import { UsernameAndNewUsernameAreEqualError } from "@/user/domain/errors/UsernameAndNewUsernameAreEqualError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserUniquenessChecker } from "@/user/domain/services/UserUniquenessChecker";
import { UserUsername } from "@/user/domain/value-objects/UserUsername";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(private userRepository: UserRepository) {
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newUsername: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.username === new UserUsername(newUsername))
      throw new UsernameAndNewUsernameAreEqualError(newUsername);

    await this.userUniquenessChecker.ensureUsernameIsNotUsed(newUsername);
    await user.changeUsername(new UserUsername(newUsername));

    return this.userRepository.edit(user);
  }
}
