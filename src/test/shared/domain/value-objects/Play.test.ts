import { PLAY_STEPS_UPPER_LIMIT } from "@/config";
import { PlayMustHaveAtLeastOneStepError } from "@/shared/domain/errors/PlayMustHaveAtLeastOneStepError";
import { PlayStepElementsListIsTooLongError } from "@/shared/domain/errors/PlayStepElementsListIsTooLongError";
import { PlayStepsListIsTooLongError } from "@/shared/domain/errors/PlayStepsListTooLong";
import { Play } from "@/shared/domain/value-objects/Play";
import { PlayElement } from "@/shared/domain/value-objects/PlayElement";
import { PlayElementType } from "@/shared/domain/value-objects/PlayElementType";
import { PlayStep } from "@/shared/domain/value-objects/PlayStep";
import { describe, expect, it } from "vitest";

describe("Play tests", () => {
  it("should not throw error if play steps list has at least one element", () => {
    const playElement = new PlayElement(
      "123e4567-e89b-12d3-a456-426614174000",
      55,
      20,
      PlayElementType.BALL
    );
    const playStep = new PlayStep([playElement]);
    expect(() => new Play([playStep])).not.toThrow();
  });

  it("should throw error if no elements in steps list ", () => {
    expect(() => new Play([])).toThrowError(PlayMustHaveAtLeastOneStepError);
  });

  it("should throw error if steps list is too large ", () => {
    const playElement = new PlayElement(
      "123e4567-e89b-12d3-a456-426614174000",
      55,
      20,
      PlayElementType.BALL
    );
    const playStep = new PlayStep([playElement]);
    expect(
      () => new Play(Array(PLAY_STEPS_UPPER_LIMIT + 1).fill(playStep))
    ).toThrowError(PlayStepsListIsTooLongError);
  });
});
