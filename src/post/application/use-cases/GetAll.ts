import { PostRepository } from "@/post/domain/repositories/PostRepository";

export class GetAll {
  constructor(private postRepository: PostRepository) {}

  async run () {
    return this.postRepository.getAll()
  }
}