import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class ChangeDraftPlay {
  private draftRepository: DraftRepository;
  private readonly draftFinder: DraftFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
    this.draftFinder = new DraftFinder(draftRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, actorId: string, newPlay: PlayDTO) {
    const draft = await this.draftFinder.findById(DraftId.fromPrimitives(id));

    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      draft.userId
    );

    draft.changePlay(Play.fromPrimitives(newPlay));
    return this.draftRepository.edit(draft);
  }
}
