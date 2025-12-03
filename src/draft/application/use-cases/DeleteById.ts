import { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class DeleteById {
  private draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string) {
    const draftId = new DraftId(id);
    await this.draftFinder.findById(draftId);
    return this.draftRepository.deleteById(draftId);
  }
}
