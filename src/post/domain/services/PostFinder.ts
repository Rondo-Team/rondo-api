import { PostNotFoundByIdError } from "../errors/PostNotFoundByIdError.ts";
import { PostRepository } from "../repositories/PostRepository.ts";
import { PostId } from "../value-objects/PostId.ts";

export class PostFinder {
  constructor(private postRepository: PostRepository) {}

  async findById(id: PostId) {
    const post = await this.postRepository.getOneById(id);
    if (!post) throw new PostNotFoundByIdError(id.toPrimitives());
    return post;
  }
}
