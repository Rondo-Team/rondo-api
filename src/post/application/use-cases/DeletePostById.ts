import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class DeletePostById {
  private postRepository: PostRepository;
  private readonly postFinder: PostFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  private userRepository: UserRepository;
  private userFinder: UserFinder;
  constructor(postRepository: PostRepository, userRepository: UserRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.postFinder = new PostFinder(postRepository);
    this.userFinder = new UserFinder(userRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string) {
    const postId = PostId.fromPrimitives(id);
    const actorUserId = UserId.fromPrimitives(actorId);

    const post = await this.postFinder.findById(postId);
    await this.resourceAccessChecker.check(actorUserId, post.userId);

    const user = await this.userFinder.findById(actorUserId);
    user.deletePost(postId);
    await this.userRepository.edit(user);

    return this.postRepository.deleteById(post.id);
  }
}
