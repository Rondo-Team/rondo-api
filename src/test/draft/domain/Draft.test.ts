import { beforeEach, describe, expect, it } from "vitest";
import { Draft } from "../../../draft/domain/Draft.ts";
import { DraftDescription } from "../../../draft/domain/value-objects/DraftDescription.ts";
import { DraftId } from "../../../draft/domain/value-objects/DraftId.ts";
import { DraftTitle } from "../../../draft/domain/value-objects/DraftTitle.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { PlayElement } from "../../../shared/domain/value-objects/PlayElement.ts";
import { PlayElementType } from "../../../shared/domain/value-objects/PlayElementType.ts";
import { PlayStep } from "../../../shared/domain/value-objects/PlayStep.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Draft model tests", () => {
  let draft: Draft;
  const element = new PlayElement(
    "550e8420-e29b-41d4-a716-446655440000",
    20,
    30,
    PlayElementType.PLAYER
  );
  const step = new PlayStep([element]);

  const makeDraft = () =>
    new Draft(
      new DraftId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("123e4567-e89b-12d3-a456-426614174000"),
      new DraftTitle("Example Post Title"),
      new DraftDescription("This is an example post description."),
      new CreatedAt(new Date("2023-01-01")),
      new Play([step])
    );

  beforeEach(() => {
    draft = makeDraft();
  });

  it("creates a post correctly with all fields", () => {
    expect(draft.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(draft.userId.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(draft.title.value).toBe("Example Post Title");
    expect(draft.description.value).toBe(
      "This is an example post description."
    );
    expect(draft.createdAt.value).toEqual(new Date("2023-01-01"));
    expect(
      draft.play.value.steps.map((step) =>
        step.value.elements.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        }))
      )
    ).toEqual([
      [
        {
          id: "550e8420-e29b-41d4-a716-446655440000",
          x: 20,
          y: 30,
          elementType: "PLAYER",
        },
      ],
    ]);
  });

  it("allows changing the title", () => {
    const newTitle = new DraftTitle("New Draft Title");
    draft.changeTitle(newTitle);
    expect(draft.title.value).toBe("New Draft Title");
  });

  it("allows changing the description", () => {
    const newDesc = new DraftDescription("New description");
    draft.changeDescription(newDesc);
    expect(draft.description.value).toBe("New description");
  });

  it("allows changing the play", () => {
    const newElement = new PlayElement(
      "550e8400-e29b-41d4-a716-446655440000",
      10,
      20,
      PlayElementType.PLAYER
    );
    const newStep = new PlayStep([newElement]);
    const newPlay = new Play([newStep]);

    draft.changePlay(newPlay);

    expect(
      draft.play.value.steps.map((step) =>
        step.value.elements.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        }))
      )
    ).toEqual([
      [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          x: 10,
          y: 20,
          elementType: "PLAYER",
        },
      ],
    ]);
  });
});
