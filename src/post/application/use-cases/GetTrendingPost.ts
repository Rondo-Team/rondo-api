import { PostsNotFoundError } from "../../domain/errors/PostsNotFoundError.ts";
import type { PostReadModelRepository } from "../../domain/repositories/PostReadModelRepository.ts";

export class GetTrendingPost {
  private postReadModelRepository: PostReadModelRepository;
  constructor(postReadModelRepository: PostReadModelRepository) {
    this.postReadModelRepository = postReadModelRepository;
  }

  async run() {
    const post =
      (await this.postReadModelRepository.getMostRatedPostSinceDays(7)) ??
      (await this.postReadModelRepository.getMostRatedPostSinceDays(30)) ??
      (await this.postReadModelRepository.getMostRatedPost());

    if (!post) throw new PostsNotFoundError();
    return post;
  }
}
