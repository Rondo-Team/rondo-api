import { PostNotFoundByIdError } from "../errors/PostNotFoundByIdError.ts";
import type { PostRepository } from "../repositories/PostRepository.ts";
import { PostId } from "../value-objects/PostId.ts";

export class PostFinder {
  private postRepository: PostRepository;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async findById(id: PostId) {
    const post = await this.postRepository.getOneById(id);
    if (!post) throw new PostNotFoundByIdError(id.toPrimitives());
    return post;
  }

  async existsWithId(id: PostId) {
    return this.postRepository.existsWithId(id);
  }
}
