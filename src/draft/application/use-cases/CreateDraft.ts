import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Draft } from "../../domain/Draft.ts";
import { DraftWithIdAlreadyExistsError } from "../../domain/errors/DraftWithIdAlreadyExistsError.ts";
import { DraftWithUserNotFoundError } from "../../domain/errors/DraftWithUserNotFoundError.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftDescription } from "../../domain/value-objects/DraftDescription.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";
import { DraftTitle } from "../../domain/value-objects/DraftTitle.ts";

export class CreateDraft {
  private draftRepository: DraftRepository;
  private userRepository: UserRepository;
  constructor(
    draftRepository: DraftRepository,
    userRepository: UserRepository
  ) {
    this.draftRepository = draftRepository;
    this.userRepository = userRepository;
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
