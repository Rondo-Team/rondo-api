import { UsernameAndNewUsernameAreEqualError } from "../../domain/errors/UsernameAndNewUsernameAreEqualError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker";
import { UserUsername } from "../../domain/value-objects/UserUsername";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(private UserRepository: UserRepository) {
    this.userUniquenessChecker = new UserUniquenessChecker(UserRepository);
    this.userFinder = new UserFinder(UserRepository);
  }

  async run(id: string, newUsername: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.username === new UserUsername(newUsername))
      throw new UsernameAndNewUsernameAreEqualError(newUsername);

    await this.userUniquenessChecker.ensureUsernameIsNotUsed(newUsername);
    await user.changeUsername(new UserUsername(newUsername));

    return this.UserRepository.edit(user);
  }
}
