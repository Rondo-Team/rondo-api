import { EmailAndNewEmailAreEqualError } from "../../domain/errors/EmailAndNewEmailAreEqualError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker";
import { UserEmail } from "../../domain/value-objects/UserEmail";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(private UserRepository: UserRepository) {
    this.userUniquenessChecker = new UserUniquenessChecker(UserRepository);
    this.userFinder = new UserFinder(UserRepository);
  }

  async run(id: string, newEmail: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.email === new UserEmail(newEmail))
      throw new EmailAndNewEmailAreEqualError(newEmail);
    await this.userUniquenessChecker.ensureEmailIsNotUsed(newEmail);
    await user.changeEmail(new UserEmail(newEmail));

    return this.UserRepository.edit(user);
  }
}
