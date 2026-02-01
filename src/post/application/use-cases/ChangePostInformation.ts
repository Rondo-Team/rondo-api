import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { type PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostDescription } from "../../domain/value-objects/PostDescription.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";
import { PostTitle } from "../../domain/value-objects/PostTitle.ts";

export class ChangePostInformation {
  private postRepository: PostRepository;
  private readonly postFinder: PostFinder;
  private resorceAccessChecker: ResourceAccessChecker;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
    this.resorceAccessChecker = new ResourceAccessChecker();
  }

  async run(
    id: string,
    actorId: string,
    newTitle: string,
    newDescription: string
  ) {
    const post = await this.postFinder.findById(new PostId(id));

    await this.resorceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      post.userId
    );

    post.changeTitle(new PostTitle(newTitle));
    post.changeDescription(new PostDescription(newDescription));

    return this.postRepository.edit(post);
  }
}
