import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftDescription } from "../../domain/value-objects/DraftDescription.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";
import { DraftTitle } from "../../domain/value-objects/DraftTitle.ts";

export class ChangeDraftInformation {
  private draftRepository: DraftRepository;
  private readonly draftFinder: DraftFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
    this.draftFinder = new DraftFinder(draftRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(
    id: string,
    actorId: string,
    newTitle: string,
    newDescription: string
  ) {
    const draft = await this.draftFinder.findById(new DraftId(id));

    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      draft.userId
    );

    draft.changeTitle(new DraftTitle(newTitle));
    draft.changeDescription(new DraftDescription(newDescription));

    return this.draftRepository.edit(draft);
  }
}
