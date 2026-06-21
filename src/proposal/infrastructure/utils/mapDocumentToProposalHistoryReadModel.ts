import type { Document } from "mongodb";
import type { ProposalHistoryReadModel } from "../../domain/read-models/ProposalHistoryReadModel.ts";

export function mapDocumentToProposalHistoryReadModel(
  document: Document,
): ProposalHistoryReadModel[] {
  return document.historyEntries.map((entrie) => ({
    user: {
      id: entrie.user.id,
      name: entrie.user.name,
      username: entrie.user.username,
      profilePicture: entrie.user.profilePicture,
    },
    createdAt: entrie.createdAt,
    intent: entrie.intent,
    payload: entrie.payload,
  }));
}
