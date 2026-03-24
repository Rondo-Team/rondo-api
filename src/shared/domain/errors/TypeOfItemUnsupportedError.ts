import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class TypeOfItemUnsupportedError extends DomainError {
  constructor() {
    super(
      `The type of the item is unsupported`,
      DomainErrorCode.TYPE_OF_ITEM_UNSUPPORTED,
    );
  }
}
