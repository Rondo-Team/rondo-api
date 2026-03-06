import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";

export class GetAllPostsByUserId {
  private postReadModelRepository: PostReadModelRepository;
  private readonly userFinder: UserFinder;
  constructor(
    postReadModelRepository: PostReadModelRepository,
    userRepository: UserRepository,
  ) {
    this.postReadModelRepository = postReadModelRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = new UserId(id);
    await this.userFinder.findById(userId);
    return this.postReadModelRepository.getAllByUserId(userId);
  }
}
