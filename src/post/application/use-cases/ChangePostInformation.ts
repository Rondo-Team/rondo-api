import { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostFinder } from "../../domain/services/PostFinder.ts";
import { PostDescription } from "../../domain/value-objects/PostDescription.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";
import { PostTitle } from "../../domain/value-objects/PostTitle.ts";

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
