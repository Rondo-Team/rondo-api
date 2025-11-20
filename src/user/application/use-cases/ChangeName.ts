import { NameAndNewNameAreEqualError } from "@/user/domain/errors/NameAndNewNameAreEqualError";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserName } from "@/user/domain/value-objects/UserName";

export class ChangeName {
  private readonly userFinder: UserFinder;
  constructor(private userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newName: string): Promise<void> {
    const user = await this.userFinder.findById(id);

    if (user.name === new UserName(newName))
      throw new NameAndNewNameAreEqualError(newName);
    await user.changeName(new UserName(newName));

    return this.userRepository.edit(user);
  }
}
