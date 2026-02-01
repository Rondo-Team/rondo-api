import { Db, type Collection } from "mongodb";
import { container } from "../../../../container.ts";
import type { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { MongoCollections } from "../../../../shared/persistance/infrastructure/mongo/MongoCollections.ts";
import type { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import {
  ReplyProposalHistoryEntrie,
  type ReplyProposalHistoryEntriePrimitives,
} from "../../domain/ReplyProposalHistoryEntrie.ts";
import type { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository.ts";

export class MongoReplyProposalHistoryEntrieRepository implements ReplyProposalHistoryEntrieRepository {
  private readonly replyProposalHistoryEntries: Collection<ReplyProposalHistoryEntriePrimitives>;

  public static async create() {
    const db = await container.getAsync(Db);
    return new MongoReplyProposalHistoryEntrieRepository(db);
  }

  constructor(db: Db) {
    this.replyProposalHistoryEntries = db.collection(
      MongoCollections.REPLY_PROPOSAL_HISTORY_ENTRIE,
    );
  }

  async create(
    replyProposalHistoryEntrie: ReplyProposalHistoryEntrie,
  ): Promise<void> {
    const primitives = replyProposalHistoryEntrie.toPrimitives();
    await this.replyProposalHistoryEntries.insertOne(primitives);
  }

  async getAllByProposalId(
    proposalId: ProposalId,
  ): Promise<ReplyProposalHistoryEntrie[]> {
    const replyEntries = await this.replyProposalHistoryEntries
      .find({
        proposalId: proposalId.toPrimitives(),
      })
      .toArray();

    return replyEntries.map((entry) =>
      ReplyProposalHistoryEntrie.fromPrimitives(entry),
    );
  }

  async existsWithId(id: ProposalHistoryEntrieId): Promise<boolean> {
    return (
      (await this.replyProposalHistoryEntries.countDocuments(
        { id: id.toPrimitives() },
        { limit: 1 },
      )) > 0
    );
  }
}
