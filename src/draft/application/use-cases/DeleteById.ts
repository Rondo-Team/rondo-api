import { DraftRepository } from "@/draft/domain/repositories/DraftRepository";
import { DraftFinder } from "@/draft/domain/services/DraftFinder";
import { DraftId } from "@/draft/domain/value-objects/DraftId";

export class DeleteById {
  private draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string) {
    const draftId = new DraftId(id)
    await this.draftFinder.findById(draftId);
    return this.draftRepository.deleteById(draftId);
  }
}
