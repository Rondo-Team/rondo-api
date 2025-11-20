import { POST_PROPOSALS_UPPER_LIMIT } from "@/config";
import { PostProposalsCountIsInvalidError } from "../errors/PostProposalsCountIsInvalidError";

export class PostProposalsCount {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (
      !Number.isInteger(this.value) ||
      this.value < 0 ||
      this.value > POST_PROPOSALS_UPPER_LIMIT
    )
      throw new PostProposalsCountIsInvalidError(this.value);
  }

  toPrimitive() {
    return this.value;
  }
}
