import { PasswordHasherRepository } from "../../../shared/services/bcrypt/domain/repositories/PasswordHasherRepository";
import { HashedPassword } from "../../../shared/services/bcrypt/domain/value-objects/HashedPassword";
import { PlainPassword } from "../../../shared/services/bcrypt/domain/value-objects/PlainPassword";
import { IncorrectPasswordError } from "../../domain/errors/IncorrectPasswordError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";

export class ChangeEmail {
  private readonly userFinder: UserFinder;
  constructor(
    private userRepository: UserRepository,
    private passwordHasherRepository: PasswordHasherRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userFinder.findById(id);
    if (
      !(await this.passwordHasherRepository.compare(
        currentPassword,
        user.password.toPrimitives()
      ))
    )
      throw new IncorrectPasswordError();

    const plainPassword = new PlainPassword(newPassword);
    const hashedPassword = await this.passwordHasherRepository.hash(
      plainPassword.toPrimitives()
    );

    await user.changePassword(new HashedPassword(hashedPassword));

    return this.userRepository.edit(user);
  }
}
