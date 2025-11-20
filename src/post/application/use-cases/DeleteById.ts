import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";

export class CreatePost {
  private postFinder: PostFinder;
  constructor(private postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const post = await this.postFinder.findById(new PostId(id));
    return this.postRepository.deleteById(post.id);
  }
}
