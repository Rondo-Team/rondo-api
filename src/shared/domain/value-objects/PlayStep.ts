import { PLAY_STEP_ELEMENTS_UPPER_LIMIT } from "@/config/domain/Consts";
import { PlayStepElementsListIsTooLongError } from "../errors/PlayStepElementsListIsTooLongError";
import { PlayStepMustHaveAtLeastOneElementError } from "../errors/PlayStepMustHaveAtLeastOneElementError";
import { PlayElement } from "./PlayElement";

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
