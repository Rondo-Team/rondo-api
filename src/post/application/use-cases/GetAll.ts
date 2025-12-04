import type { PostRepository } from "../../domain/repositories/PostRepository.ts";

export class GetAll {
  private postRepository: PostRepository;
  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async run() {
    return this.postRepository.getAll();
  }
}
