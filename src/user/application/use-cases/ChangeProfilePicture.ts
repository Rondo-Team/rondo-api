import type { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";
import { UserProfilePicture } from "../../domain/value-objects/UserProfilePicture.ts";

export class ChangeProfilePicture {
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newProfilePicture: string): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));

    await user.changeProfilePicture(new UserProfilePicture(newProfilePicture));

    return this.userRepository.edit(user);
  }
}
