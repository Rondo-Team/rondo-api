import { Db, type Collection } from "mongodb";
import { container } from "../../../../container.ts";
import type { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { MongoCollections } from "../../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import {
  ActivityProposalHistoryEntrie,
  type ActivityProposalHistoryEntriePrimitives,
} from "../../domain/ActivityProposalHistoryEntrie.ts";
import type { ActivityProposalHistoryEntrieRepository } from "../../domain/repositories/ActivityProposalHistoryEntrieRepository.ts";

export class MongoActivityProposalHistoryEntrieRepository implements ActivityProposalHistoryEntrieRepository {
  private readonly activityProposalHistoryEntries: Collection<ActivityProposalHistoryEntriePrimitives>;

  public static async create() {
    const db = await container.getAsync(Db);
    return new MongoActivityProposalHistoryEntrieRepository(db);
  }

  constructor(db: Db) {
    this.activityProposalHistoryEntries = db.collection(
      MongoCollections.ACTIVITY_PROPOSAL_HISTORY_ENTRIE,
    );
  }

  async create(
    activityProposalHistoryEntrie: ActivityProposalHistoryEntrie,
  ): Promise<void> {
    const primitives = activityProposalHistoryEntrie.toPrimitives();
    await this.activityProposalHistoryEntries.insertOne(primitives);
  }

  async getAllByProposalId(
    proposalId: ProposalId,
  ): Promise<ActivityProposalHistoryEntrie[]> {
    const activityEntries = await this.activityProposalHistoryEntries
      .find({
        proposalId: proposalId.toPrimitives(),
      })
      .toArray();

    return activityEntries.map((entry) =>
      ActivityProposalHistoryEntrie.fromPrimitives(entry),
    );
  }

  async existsWithId(id: ProposalHistoryEntrieId): Promise<boolean> {
    return (
      (await this.activityProposalHistoryEntries.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }
}
