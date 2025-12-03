import { UserRepository } from "../../domain/repositories/UserRepository.ts";
import { UserFinder } from "../../domain/services/UserFinder.ts";
import { User } from "../../domain/User.ts";
import { UserId } from "../../domain/value-objects/UserId.ts";

export class GetById {
  private readonly userFinder: UserFinder;
  constructor(userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string): Promise<User | undefined> {
    return this.userFinder.findById(new UserId(id));
  }
}
