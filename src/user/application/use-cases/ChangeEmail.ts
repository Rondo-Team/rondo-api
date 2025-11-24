import { EmailAndNewEmailAreEqualError } from "@/user/domain/errors/EmailAndNewEmailAreEqualError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserUniquenessChecker } from "@/user/domain/services/UserUniquenessChecker";
import { UserEmail } from "@/user/domain/value-objects/UserEmail";
import { UserId } from "@/user/domain/value-objects/UserId";

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
    await this.userUniquenessChecker.ensureEmailIsNotUsed(new UserEmail(newEmail));
    await user.changeEmail(new UserEmail(newEmail));

    return this.userRepository.edit(user);
  }
}
