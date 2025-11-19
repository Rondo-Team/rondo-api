import { UserRepository } from "@/User/domain/repositories/UserRepository";
import { UserFinder } from "@/User/domain/services/UserFinder";
import { User } from "@/User/domain/User";

export class GetById {
  private readonly userFinder: UserFinder;
  constructor(private userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string): Promise<User | undefined> {
    return this.userFinder.findById(id);
  }
}
