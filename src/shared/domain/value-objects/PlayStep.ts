import { PLAY_STEP_ELEMENTS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { PlayStepElementsListIsTooLongError } from "../errors/PlayStepElementsListIsTooLongError.ts";
import { PlayStepMustHaveAtLeastOneElementError } from "../errors/PlayStepMustHaveAtLeastOneElementError.ts";
import { PlayElement } from "./PlayElement.ts";

export class PlayStep {
  constructor(readonly value: PlayElement[]) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const elementsNumber = this.value.length;

    if (elementsNumber < 1) throw new PlayStepMustHaveAtLeastOneElementError();
    if (elementsNumber > PLAY_STEP_ELEMENTS_UPPER_LIMIT)
      throw new PlayStepElementsListIsTooLongError();
  }
}
