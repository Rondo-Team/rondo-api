import { PostWithIdAlreadyExistsError } from "@/post/domain/errors/PostWithIdAlreadyExistsError";
import { Post } from "@/post/domain/Post";
import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostCommentsCount } from "@/post/domain/value-objects/PostCommentsCount";
import { PostDescription } from "@/post/domain/value-objects/PostDescription";
import { PostFavouritesCount } from "@/post/domain/value-objects/PostFavouritesCount";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PostProposalsCount } from "@/post/domain/value-objects/PostProposalsCount";
import { PostTags } from "@/post/domain/value-objects/PostTags";
import { PostTitle } from "@/post/domain/value-objects/PostTitle";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";

export class CreatePost {
  private readonly userFinder: UserFinder;
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    id: string,
    userId: string,
    title: string,
    description: string,
    favouritesCount: number,
    commentsCount: number,
    proposalsCount: number,
    createdAt: Date,
    tags: string[] = [],
    playDTO: PlayDTO
  ) {
    const post = new Post(
      new PostId(id),
      new UserId(userId),
      new PostTitle(title),
      new PostDescription(description),
      new PostFavouritesCount(favouritesCount),
      new PostCommentsCount(commentsCount),
      new PostProposalsCount(proposalsCount),
      new CreatedAt(createdAt),
      new PostTags(tags),
      Play.fromPrimitives(playDTO.steps)
    );

    // Ensure PostId do not already exists
    if (await this.postRepository.existsWithId(new PostId(id)))
      throw new PostWithIdAlreadyExistsError(id);
    // Ensure user exists automaticaly
    const user = await this.userFinder.findById(new UserId(userId));
    //Triggers an user postsCount update
    user.addPost();
    await this.userRepository.edit(user);

    return this.postRepository.create(post);
  }
}
