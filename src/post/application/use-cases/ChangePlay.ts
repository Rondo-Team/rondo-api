import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { Play } from "@/shared/domain/value-objects/Play";

export class CreatePost {
  private postFinder: PostFinder;
  constructor(private postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id:string, newPlay: PlayDTO) {
    const post = await this.postFinder.findById(new PostId(id));
    post.changePlay(Play.fromPrimitives(newPlay.steps))

    return this.postRepository.edit(post);
  }
}