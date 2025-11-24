import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { UserId } from "@/user/domain/value-objects/UserId";

export class GetAllByUserId {
  constructor(private postRepository: PostRepository) {}

  async run(id: string) {
    return this.postRepository.getAllByUserId(new UserId(id));
  }
}
