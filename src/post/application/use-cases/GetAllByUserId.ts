import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../domain/repositories/PostRepository.ts";

export class GetAllByUserId {
  private postRepository: PostRepository;
  private readonly userFinder: UserFinder;
  constructor(postRepository: PostRepository, userRepository: UserRepository) {
    this.postRepository = postRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string) {
    const userId = new UserId(id);
    await this.userFinder.findById(userId);
    return this.postRepository.getAllByUserId(userId);
  }
}
