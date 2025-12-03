import { POST_PROPOSALS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { Count } from "../../../shared/domain/value-objects/Count.ts";
import { PostProposalsCountIsInvalidError } from "../errors/PostProposalsCountIsInvalidError.ts";

export class PostProposalsCount extends Count {
  readonly value: number;
  constructor(value: number) {
    super(value, POST_PROPOSALS_UPPER_LIMIT);
    this.value = value;
  }

  protected CountIsInvalidError() {
    return new PostProposalsCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
