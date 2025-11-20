import { PLAY_STEPS_UPPER_LIMIT } from "@/config";
import { PlayMustHaveAtLeastOneStepError } from "../errors/PlayMustHaveAtLeastOneStepError";
import { PlayStepsListIsTooLongError } from "../errors/PlayStepsListTooLong";
import { PlayStep } from "./PlayStep";

export class Play {
  value: PlayStep[];

  constructor(value: PlayStep[]) {
    this.value = value;
    this.ensureIsValid()
  }

  private ensureIsValid() {
    const stepsNumber = this.value.length;

    if (stepsNumber < 1) throw new PlayMustHaveAtLeastOneStepError();
    if (stepsNumber > PLAY_STEPS_UPPER_LIMIT)
      throw new PlayStepsListIsTooLongError();
  }
}
