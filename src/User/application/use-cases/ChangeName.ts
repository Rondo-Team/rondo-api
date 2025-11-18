import { NameAndNewNameAreEqualError } from "../../domain/errors/NameAndNewNameAreEqualError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserFinder } from "../../domain/services/UserFinder";
import { UserName } from "../../domain/value-objects/UserName";

export class ChangeName {
  private readonly userFinder: UserFinder;
  constructor(private UserRepository: UserRepository) {
    this.userFinder = new UserFinder(UserRepository);
  }

  async run(id: string, newName: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.name === new UserName(newName))
      throw new NameAndNewNameAreEqualError(newName);
    await user.changeName(new UserName(newName));

    return this.UserRepository.edit(user);
  }
}
