import { PostNotFoundByIdError } from "../errors/PostNotFoundByIdError";
import { PostRepository } from "../repositories/PostRepository";
import { PostId } from "../value-objects/PostId";

export class PostFinder {
  constructor(private postRepository: PostRepository) {}

  async findById(id: PostId) {
    const post = await this.postRepository.getOneById(id);
    if (!post) throw new PostNotFoundByIdError(id.toPrimitives());
    return post;
  }
}
