import { PLAY_STEPS_UPPER_LIMIT } from "@/config";
import { PlayMustHaveAtLeastOneStepError } from "../errors/PlayMustHaveAtLeastOneStepError";
import { PlayStepsListIsTooLongError } from "../errors/PlayStepsListTooLong";
import { PlayElement } from "./PlayElement";
import { PlayStep } from "./PlayStep";

export class Play {
  value: PlayStep[];

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
}
