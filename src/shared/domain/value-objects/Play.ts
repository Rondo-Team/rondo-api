import { PLAY_STEPS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { PlayMustHaveAtLeastOneStepError } from "../errors/PlayMustHaveAtLeastOneStepError.ts";
import { PlayStepsListIsTooLongError } from "../errors/PlayStepsListTooLong.ts";
import { PlayElement } from "./PlayElement.ts";
import { PlayStep } from "./PlayStep.ts";

export class Play {
  readonly value: { steps: PlayStep[] };
  constructor(value: PlayStep[]) {
    this.value = { steps: value };
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const stepsNumber = this.value.steps.length;

    if (stepsNumber < 1) throw new PlayMustHaveAtLeastOneStepError();
    if (stepsNumber > PLAY_STEPS_UPPER_LIMIT)
      throw new PlayStepsListIsTooLongError();
  }

  static fromPrimitives(play: {
    steps: {
      elements: {
        id: string;
        x: number;
        y: number;
        elementType: string;
      }[];
    }[];
  }) {
    return new Play(
      play.steps.map(
        (playStep) =>
          new PlayStep(
            playStep.elements.map(
              (playElement) =>
                new PlayElement(
                  playElement.id,
                  playElement.x,
                  playElement.y,
                  playElement.elementType
                )
            )
          )
      )
    );
  }

  toPrimitives() {
    return { elements: this.value.steps.map((step) => step.toPrimitives()) };
  }
}
