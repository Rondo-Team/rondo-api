import { RecentlyViewedItemType } from "../../../shared/domain/types/RecentlyViewedItemType.ts";
import { RecentlyViewedItem } from "../../../shared/domain/value-objects/RecentlyViewedItem.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { PostNotFoundByIdError } from "../../domain/errors/PostNotFoundByIdError.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class GetPostById {
  private postReadModelRepository: PostReadModelRepository;
  private userFinder: UserFinder;
  private userRepository: UserRepository;
  constructor(
    postReadModelRepository: PostReadModelRepository,
    userRepository: UserRepository,
  ) {
    this.postReadModelRepository = postReadModelRepository;
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
  }

  async run(id: string, actorId: string) {
    const post = await this.postReadModelRepository.getOneById(
      PostId.fromPrimitives(id),
    );
    if (!post) throw new PostNotFoundByIdError(id);
    // Side effects, DomainEvents incoming to sanitize this
    const user = await this.userFinder.findById(UserId.fromPrimitives(actorId));
    const item = RecentlyViewedItem.fromPrimitives({
      id: post.id,
      type: RecentlyViewedItemType.POST,
      openedAt: new Date(),
    });
    user.viewItem(item);
    await this.userRepository.edit(user);

    return post;
  }
}
