import { PlayElementType } from "../../../domain/value-objects/PlayElementType.ts";

export const TWO_STEPS_PLAY = {
  steps: [
    {
      elements: [
        {
          id: "550a8400-e29b-41d4-a716-446655440000",
          x: 10,
          y: 20,
          elementType: PlayElementType.BALL,
        },
        {
          id: "350a8400-e29b-41d4-a716-446655440000",
          x: 15,
          y: 20,
          elementType: PlayElementType.PLAYER,
        },
      ],
    },
    {
      elements: [
        {
          id: "550a8400-e29b-41d4-a716-446655440000",
          x: 5,
          y: 20,
          elementType: PlayElementType.BALL,
        },
        {
          id: "350a8400-e29b-41d4-a716-446655440000",
          x: 20,
          y: 20,
          elementType: PlayElementType.PLAYER,
        },
      ],
    },
  ],
};

export const ONE_STEP_PLAY = {
  steps: [
    {
      elements: [
        {
          id: "550a8400-e29b-41d4-a716-446655440000",
          x: 10,
          y: 20,
          elementType: PlayElementType.BALL,
        },
        {
          id: "350a8400-e29b-41d4-a716-446655440000",
          x: 15,
          y: 20,
          elementType: PlayElementType.PLAYER,
        },
      ],
    },
    {
      elements: [
        {
          id: "550a8400-e29b-41d4-a716-446655440000",
          x: 5,
          y: 20,
          elementType: PlayElementType.BALL,
        },
        {
          id: "350a8400-e29b-41d4-a716-446655440000",
          x: 20,
          y: 20,
          elementType: PlayElementType.PLAYER,
        },
      ],
    },
  ],
};
