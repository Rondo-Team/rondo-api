import { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import { DraftFinder } from "../../domain/services/DraftFinder.ts";
import { DraftId } from "../../domain/value-objects/DraftId.ts";

export class ChangePlay {
  private readonly draftFinder: DraftFinder;
  constructor(private draftRepository: DraftRepository) {
    this.draftFinder = new DraftFinder(draftRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const draft = await this.draftFinder.findById(new DraftId(id));
    draft.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.draftRepository.edit(draft);
  }
}
