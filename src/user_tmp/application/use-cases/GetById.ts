import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { User } from "@/user/domain/User";
import { UserId } from "@/user/domain/value-objects/UserId";

export class GetById {
  private readonly userFinder: UserFinder;
  constructor(private userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string): Promise<User | undefined> {
    return this.userFinder.findById(new UserId(id));
  }
}
