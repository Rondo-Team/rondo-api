import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostDescription } from "@/post/domain/value-objects/PostDescription";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PostTitle } from "@/post/domain/value-objects/PostTitle";

export class ChangePostInformation {
  private readonly postFinder: PostFinder;
  constructor(private postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, newTitle: string, newDescription: string) {
    const post = await this.postFinder.findById(new PostId(id));

    post.changeTitle(new PostTitle(newTitle));
    post.changeDescription(new PostDescription(newDescription));

    return this.postRepository.edit(post);
  }
}
