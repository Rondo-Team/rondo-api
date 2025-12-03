import { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { PostWithIdAlreadyExistsError } from "../../domain/errors/PostWithIdAlreadyExistsError.ts";
import { Post } from "../../domain/Post.ts";
import { PostRepository } from "../../domain/repositories/PostRepository.ts";
import { PostCommentsCount } from "../../domain/value-objects/PostCommentsCount.ts";
import { PostDescription } from "../../domain/value-objects/PostDescription.ts";
import { PostFavouritesCount } from "../../domain/value-objects/PostFavouritesCount.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";
import { PostProposalsCount } from "../../domain/value-objects/PostProposalsCount.ts";
import { PostTags } from "../../domain/value-objects/PostTags.ts";
import { PostTitle } from "../../domain/value-objects/PostTitle.ts";

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
