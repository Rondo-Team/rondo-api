import { IdIsNotValidError } from "../errors/IdIsNotValidError";
import { PlayElementXIsOutOfRange } from "../errors/PlayElementXIsOutOfRangeError";
import { PlayElementType } from "./PlayElementType";

export class PlayElement {
  id: string;
  x: number;
  y: number;
  elementType: PlayElementType;

  constructor(id: string, x: number, y: number, elementType: PlayElementType) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.elementType = elementType;
  }

  private ensureIsValid() {
    // X and Y are percentages.
    if (this.x < 0 || this.x > 100) throw new PlayElementXIsOutOfRange(this.x);
    if (this.y < 0 || this.y > 100) throw new PlayElementXIsOutOfRange(this.y);

    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!regex.test(this.id)) throw new IdIsNotValidError(this.id);
  }
}
