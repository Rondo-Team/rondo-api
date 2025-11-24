import { POST_PROPOSALS_UPPER_LIMIT } from "@/config";
import { Count } from "@/shared/domain/value-objects/Count";
import { PostProposalsCountIsInvalidError } from "../errors/PostProposalsCountIsInvalidError";

export class PostProposalsCount extends Count {
  constructor(value: number) {
    super(value, POST_PROPOSALS_UPPER_LIMIT);
  }

  protected CountIsInvalidError() {
    return new PostProposalsCountIsInvalidError(this.value);
  }

  toPrimitives() {
    return this.value;
  }
}
