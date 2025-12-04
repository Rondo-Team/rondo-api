import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftDescription } from "../../domain/value-objects/DraftDescription.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";
import { DraftTitle } from "../../domain/value-objects/DraftTitle.ts";

export class ChangeDraftInformation {
  private draftRepository: DraftRepository;
  private readonly draftFinder: DraftFinder;
  constructor(draftRepository: DraftRepository) {
    this.draftRepository = draftRepository;
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string, newTitle: string, newDescription: string) {
    const draft = await this.draftFinder.findById(new DraftId(id));

    draft.changeTitle(new DraftTitle(newTitle));
    draft.changeDescription(new DraftDescription(newDescription));

    return this.draftRepository.edit(draft);
  }
}
