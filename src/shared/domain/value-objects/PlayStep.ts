import { PLAY_STEP_ELEMENTS_UPPER_LIMIT } from "@/config";
import { PlayElement } from "./PlayElement";
import { PlayStepMustHaveAtLeastOneElementError } from "../errors/PlayStepMustHaveAtLeastOneElementError";
import { PlayStepElementsListIsTooLongError } from "../errors/PlayStepElementsListIsTooLongError"

export class PlayStep {
  value: PlayElement[];

  constructor(value: PlayElement[]) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    const elementsNumber = this.value.length;

    if (elementsNumber < 1) throw new PlayStepMustHaveAtLeastOneElementError();
    if (elementsNumber > PLAY_STEP_ELEMENTS_UPPER_LIMIT)
      throw new PlayStepElementsListIsTooLongError();
  }
}
