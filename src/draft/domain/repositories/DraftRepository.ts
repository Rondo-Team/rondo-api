import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Draft } from "../Draft.ts";
import { DraftId } from "../value-objects/DraftId.ts";

export interface DraftRepository {
  create(draft: Draft): Promise<void>;
  getOneById(id: DraftId): Promise<Draft | undefined>;
  getAllByUserId(userId: UserId): Promise<Draft[]>;
  existsWithId(id: DraftId): Promise<boolean>;
  edit(draft: Draft): Promise<void>;
  deleteById(id: DraftId): Promise<void>;
}
