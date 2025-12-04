import type { PasswordHasherRepository } from "../../../shared/password-hashing/domain/repositories/PasswordHasherRepository.ts";
import { HashedPassword } from "../../../shared/password-hashing/domain/value-objects/HashedPassword.ts";
import { PlainPassword } from "../../../shared/password-hashing/domain/value-objects/PlainPassword.ts";
import { IncorrectPasswordError } from "../../domain/errors/IncorrectPasswordError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class ChangeEmail {
  private userRepository: UserRepository;
  private passwordHasherRepository: PasswordHasherRepository;
  private readonly userFinder: UserFinder;
  constructor(
    userRepository: UserRepository,
    passwordHasherRepository: PasswordHasherRepository
  ) {
    this.userRepository = userRepository;
    this.passwordHasherRepository = passwordHasherRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));
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
