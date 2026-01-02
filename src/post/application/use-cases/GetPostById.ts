import type { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class GetPostById {
  private postFinder: PostFinder;
  constructor(postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    return this.postFinder.findById(new PostId(id));
  }
}
