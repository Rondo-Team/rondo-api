import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { PostId } from "@/post/domain/value-objects/PostId";

export class GetAllByPostId {
  constructor(private commentRepository: CommentRepository) { }

  async run(id: string) {
    return this.commentRepository.getAllByPostId(new PostId(id));
  }
}