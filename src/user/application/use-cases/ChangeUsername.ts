import { UsernameAndNewUsernameAreEqualError } from "../../domain/errors/UsernameAndNewUsernameAreEqualError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserAuthorizationChecker } from "../../domain/services/UserAuthorizationChecker.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserUniquenessChecker } from "../../domain/services/UserUniquenessChecker.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserUsername } from "../../domain/value-objects/UserUsername.ts";

export class ChangeEmail {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  private readonly userUniquenessChecker: UserUniquenessChecker;
  private readonly userAuthorizationChecker: UserAuthorizationChecker;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userUniquenessChecker = new UserUniquenessChecker(userRepository);
    this.userFinder = new UserFinder(userRepository);
    this.userAuthorizationChecker = new UserAuthorizationChecker();
  }

  async run(
    toUpdateId: string,
    updaterId: string,
    newUsername: string
  ): Promise<void> {
    await this.userAuthorizationChecker.check(
      UserId.fromPrimitives(toUpdateId),
      UserId.fromPrimitives(updaterId)
    );
    const user = await this.userFinder.findById(new UserId(toUpdateId));
    // Okey, ahora revisa que el lastModified este correcto
    if (user.username === new UserUsername(newUsername))
      throw new UsernameAndNewUsernameAreEqualError(newUsername);

    await this.userUniquenessChecker.ensureUsernameIsNotUsed(
      new UserUsername(newUsername)
    );
    await user.changeUsername(new UserUsername(newUsername));

    return this.userRepository.edit(user);
  }
}
