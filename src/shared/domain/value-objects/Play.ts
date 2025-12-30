import { PLAY_STEPS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { PlayMustHaveAtLeastOneStepError } from "../errors/PlayMustHaveAtLeastOneStepError.ts";
import { PlayStepsListIsTooLongError } from "../errors/PlayStepsListTooLong.ts";
import { PlayElement } from "./PlayElement.ts";
import { PlayStep } from "./PlayStep.ts";

export class Play {
  readonly value: PlayStep[];
  constructor(value: PlayStep[]) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const stepsNumber = this.value.length;

    if (stepsNumber < 1) throw new PlayMustHaveAtLeastOneStepError();
    if (stepsNumber > PLAY_STEPS_UPPER_LIMIT)
      throw new PlayStepsListIsTooLongError();
  }

  static fromPrimitives(
    steps: { id: string; x: number; y: number; elementType: string }[][]
  ) {
    return new Play(
      steps.map(
        (playStep) =>
          new PlayStep(
            playStep.map(
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
    return this.value.map((step) => step.toPrimitives());
  }
}
