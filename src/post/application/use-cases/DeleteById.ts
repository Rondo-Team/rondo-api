import { type PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class DeleteById {
  private postRepository: PostRepository;
  private readonly postFinder: PostFinder;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    await this.postFinder.findById(postId);
    return this.postRepository.deleteById(postId);
  }
}
