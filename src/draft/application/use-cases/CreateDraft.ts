import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Draft } from "../../domain/Draft.ts";
import { DraftWithIdAlreadyExistsError } from "../../domain/errors/DraftWithIdAlreadyExistsError.ts";
import { DraftWithUserNotFoundError } from "../../domain/errors/DraftWithUserNotFoundError.ts";
import { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftDescription } from "../../domain/value-objects/DraftDescription.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";
import { DraftTitle } from "../../domain/value-objects/DraftTitle.ts";

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
