import { UserId } from "@/user/domain/value-objects/UserId";
import { Draft } from "../Draft";
import { DraftId } from "../value-objects/DraftId";

export interface DraftRepository {
  create(draft: Draft): Promise<void>;
  getOneById(id: DraftId): Promise<Draft | undefined>;
  getAll(): Promise<Draft[] | undefined>;
  getAllByUserId(userId: UserId): Promise<Draft[] | undefined>;
  existsWithId(draftId: DraftId): Promise<boolean>;
  edit(draft: Draft): Promise<void>;
  deleteById(id: DraftId): Promise<void>;
}
