import { EmailAndNewEmailAreEqualError } from "../../domain/errors/EmailAndNewEmailAreEqualError.ts";
import { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker.ts";
import { UserEmail } from "../../domain/value-objects/UserEmail.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(private userRepository: UserRepository) {
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newEmail: string): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));

    if (user.email === new UserEmail(newEmail))
      throw new EmailAndNewEmailAreEqualError(newEmail);
    await this.userUniquenessChecker.ensureEmailIsNotUsed(
      new UserEmail(newEmail)
    );
    await user.changeEmail(new UserEmail(newEmail));

    return this.userRepository.edit(user);
  }
}
