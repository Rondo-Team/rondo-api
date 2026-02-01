import type { ResolutionContext } from "inversify";
import { type Collection, Db } from "mongodb";
import { MongoCollections } from "../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { Draft, type DraftPrimitives } from "../../domain/Draft.ts";
import type { DraftRepository } from "../../domain/repositories/DraftRepository.ts";
import type { DraftId } from "../../domain/value-objects/DraftId.ts";

export class MongoDraftRepository implements DraftRepository {
  private readonly drafts: Collection<DraftPrimitives>;
  public static async create(container: ResolutionContext) {
    const db = await container.getAsync(Db);
    return new MongoDraftRepository(db);
  }

  constructor(db: Db) {
    this.drafts = db.collection(MongoCollections.DRAFTS);
  }

  async create(draft: Draft): Promise<void> {
    const primitives = draft.toPrimitives();
    await this.drafts.insertOne(primitives);
  }

  async getOneById(id: DraftId): Promise<Draft | undefined> {
    const draft = await this.drafts.findOne(
      { id: id.toPrimitives() },
      { projection: { _id: 0 } } // Excludes the mongo id from the returned document
    );
    return draft ? Draft.fromPrimitives(draft) : undefined;
  }

  async getAllByUserId(userId: UserId): Promise<Draft[]> {
    const drafts = await this.drafts
      .find({
        userId: userId.toPrimitives(),
      })
      .toArray();

    return drafts.map((draft) => Draft.fromPrimitives(draft));
  }

  async existsWithId(id: DraftId): Promise<boolean> {
    return (
      (await this.drafts.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 }
      )) > 0
    );
  }

  async edit(draft: Draft): Promise<void> {
    const primitives = draft.toPrimitives();
    await this.drafts.updateOne(
      { id: draft.id.toPrimitives() },
      { $set: primitives } // In order to not delete the whole document
    );
  }

  async deleteById(id: DraftId): Promise<void> {
    await this.drafts.deleteOne({ id: id.toPrimitives() });
  }
}
