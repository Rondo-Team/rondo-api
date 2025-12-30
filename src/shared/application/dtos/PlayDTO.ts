import { PlayElementType } from "../../domain/value-objects/PlayElementType.ts";

export type PlayDTO = {
  steps: {
    elements: {
      id: string;
      x: number;
      y: number;
      elementType: PlayElementType;
    }[];
  }[];
};
