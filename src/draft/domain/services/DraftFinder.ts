import { DraftNotFoundByIdError } from "../errors/DraftNotFoundByIdError";
import { DraftRepository } from "../repositories/DraftRepository";
import { DraftId } from "../value-objects/DraftId";

export class DraftFinder {
  constructor(private draftRepository: DraftRepository) {}

  async findById(id: DraftId) {
    const draft = await this.draftRepository.getOneById(id);
    if (!draft) throw new DraftNotFoundByIdError(id.toPrimitives());
    return draft;
  }
}
