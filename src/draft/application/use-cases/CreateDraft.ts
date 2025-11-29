import { Draft } from "@/draft/domain/Draft";
import { DraftWithIdAlreadyExistsError } from "@/draft/domain/errors/DraftWithIdAlreadyExistsError";
import { DraftWithUserNotFoundError } from "@/draft/domain/errors/DraftWithUserNotFoundError";
import { DraftRepository } from "@/draft/domain/repositories/DraftRepository";
import { DraftDescription } from "@/draft/domain/value-objects/DraftDescription";
import { DraftId } from "@/draft/domain/value-objects/DraftId";
import { DraftTitle } from "@/draft/domain/value-objects/DraftTitle";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";

export class CreateDraft {
  private readonly userFinder: UserFinder;
  constructor(
    private draftRepository: DraftRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async run(
    id: string,
    userId: string,
    title: string,
    description: string,
    createdAt: Date,
    playDTO: PlayDTO
  ) {
    const draft = new Draft(
      new DraftId(id),
      new UserId(userId),
      new DraftTitle(title),
      new DraftDescription(description),
      new CreatedAt(createdAt),
      Play.fromPrimitives(playDTO.steps)
    );

    // Ensure DraftId do not already exists
    if (await this.draftRepository.existsWithId(new PostId(id)))
      throw new DraftWithIdAlreadyExistsError(id);
    // Ensure UserId already exists
    if (!(await this.userRepository.existsWithId(new UserId(userId))))
      throw new DraftWithUserNotFoundError(userId);

    return this.draftRepository.create(draft);
  }
}
