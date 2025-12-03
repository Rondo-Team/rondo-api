import { PostRepository } from "../../domain/repositories/PostRepository.ts";

export class GetAll {
  constructor(private postRepository: PostRepository) {}

  async run() {
    return this.postRepository.getAll();
  }
}
