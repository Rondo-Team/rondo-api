import { NameAndNewNameAreEqualError } from "../../domain/errors/NameAndNewNameAreEqualError.ts";
import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserName } from "../../domain/value-objects/UserName.ts";

export class ChangeName {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newName: string): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));

    if (user.name === new UserName(newName))
      throw new NameAndNewNameAreEqualError(newName);
    await user.changeName(new UserName(newName));

    return this.userRepository.edit(user);
  }
}
