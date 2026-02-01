import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import type { CreateReplyProposalHistoryEntrie } from "../../proposal-history-entrie/reply-proposal-history-entrie/aplication/use-cases/CreateReplyProposalHistoryEntrie.ts";

type TestReplyProposalHistoryEntrie = {
  id: string;
  proposalId: string;
  userId: string;
  createdAt: Date;
  message: string;
};

export async function insertReplyProposalHistoryEntrie(
  TEST_REPLY_PROPOSAL_HISTORY_ENTRIE: TestReplyProposalHistoryEntrie,
) {
  const createReplyProposalHistoryEntrie =
    await container.getAsync<CreateReplyProposalHistoryEntrie>(
      Token.CREATE_REPLY_PROPOSAL_HISTORY_ENTRIE,
    );
  await createReplyProposalHistoryEntrie.run(
    TEST_REPLY_PROPOSAL_HISTORY_ENTRIE.id,
    TEST_REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId,
    TEST_REPLY_PROPOSAL_HISTORY_ENTRIE.userId,
    TEST_REPLY_PROPOSAL_HISTORY_ENTRIE.createdAt,
    TEST_REPLY_PROPOSAL_HISTORY_ENTRIE.message,
  );
}
