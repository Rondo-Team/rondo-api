import { EmailAndNewEmailAreEqualError } from "@/User/domain/errors/EmailAndNewEmailAreEqualError";
import { UserRepository } from "@/User/domain/repositories/UserRepository";
import { UserFinder } from "@/User/domain/services/UserFinder";
import { UserUniquenessChecker } from "@/User/domain/services/UserUniquenessChecker";
import { UserEmail } from "@/User/domain/value-objects/UserEmail";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  constructor(private userRepository: UserRepository) {
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newEmail: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.email === new UserEmail(newEmail))
      throw new EmailAndNewEmailAreEqualError(newEmail);
    await this.userUniquenessChecker.ensureEmailIsNotUsed(newEmail);
    await user.changeEmail(new UserEmail(newEmail));

    return this.userRepository.edit(user);
  }
}
