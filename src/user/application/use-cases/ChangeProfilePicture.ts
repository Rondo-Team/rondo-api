import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";
import { UserProfilePicture } from "@/user/domain/value-objects/UserProfilePicture";

export class ChangeProfilePicture {
  private readonly userFinder: UserFinder;
  constructor(private userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, newProfilePicture: string): Promise<void> {
    const user = await this.userFinder.findById(new UserId(id));

    await user.changeProfilePicture(new UserProfilePicture(newProfilePicture));

    return this.userRepository.edit(user);
  }
}
