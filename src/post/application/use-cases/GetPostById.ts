import { PostNotFoundByIdError } from "../../domain/errors/PostNotFoundByIdError.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export class GetPostById {
  private postReadModelRepository: PostReadModelRepository;
  constructor(postReadModelRepository: PostReadModelRepository) {
    this.postReadModelRepository = postReadModelRepository;
  }

  async run(id: string) {
    const post = await this.postReadModelRepository.getOneById(
      PostId.fromPrimitives(id),
    );
    if (!post) throw new PostNotFoundByIdError(id);
    return post;
  }
}
