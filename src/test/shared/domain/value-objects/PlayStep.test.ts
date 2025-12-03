import { describe, expect, it } from "vitest";
import { PLAY_STEP_ELEMENTS_UPPER_LIMIT } from "../../../../config/domain/Consts.ts";
import { PlayStepElementsListIsTooLongError } from "../../../../shared/domain/errors/PlayStepElementsListIsTooLongError.ts";
import { PlayStepMustHaveAtLeastOneElementError } from "../../../../shared/domain/errors/PlayStepMustHaveAtLeastOneElementError.ts";
import { PlayElement } from "../../../../shared/domain/value-objects/PlayElement.ts";
import { PlayElementType } from "../../../../shared/domain/value-objects/PlayElementType.ts";
import { PlayStep } from "../../../../shared/domain/value-objects/PlayStep.ts";

describe("Play Step tests", () => {
  it("should not throw error if play elements list has at least one element", () => {
    const playElement = new PlayElement(
      "123e4567-e89b-12d3-a456-426614174000",
      55,
      20,
      PlayElementType.BALL
    );
    expect(() => new PlayStep([playElement])).not.toThrow();
  });

  it("should throw error if no elements in elements list ", () => {
    expect(() => new PlayStep([])).toThrowError(
      PlayStepMustHaveAtLeastOneElementError
    );
  });

  it("should throw error if elements list is too large ", () => {
    const playElement = new PlayElement(
      "123e4567-e89b-12d3-a456-426614174000",
      55,
      20,
      PlayElementType.BALL
    );
    expect(
      () =>
        new PlayStep(
          Array(PLAY_STEP_ELEMENTS_UPPER_LIMIT + 1).fill(playElement)
        )
    ).toThrowError(PlayStepElementsListIsTooLongError);
  });
});
