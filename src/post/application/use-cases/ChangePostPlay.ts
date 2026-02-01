import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class ChangePostPlay {
  private postRepository: PostRepository;
  private readonly postFinder: PostFinder;
  private resourceAccessChecker: ResourceAccessChecker;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string, newPlay: PlayDTO) {
    const post = await this.postFinder.findById(new PostId(id));

    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      post.userId
    );
    
    post.changePlay(Play.fromPrimitives(newPlay));

    return this.postRepository.edit(post);
  }
}
