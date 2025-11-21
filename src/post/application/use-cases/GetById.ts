import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";

export class GetById {
  private postFinder: PostFinder;
  constructor(private postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    return this.postFinder.findById(new PostId(id));
  }
}
