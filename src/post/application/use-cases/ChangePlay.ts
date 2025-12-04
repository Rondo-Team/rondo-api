import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class ChangePlay {
  private postRepository: PostRepository;
  private readonly postFinder: PostFinder;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const post = await this.postFinder.findById(new PostId(id));
    post.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.postRepository.edit(post);
  }
}
