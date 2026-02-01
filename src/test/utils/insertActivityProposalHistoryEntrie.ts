import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import type { CreateActivityProposalHistoryEntrie } from "../../proposal-history-entrie/activity-proposal-history-entrie/aplication/use-cases/CreateActivityProposalHistoryEntrie.ts";

type TestActivityProposalHistoryEntrie = {
  id: string;
  proposalId: string;
  userId: string;
  createdAt: Date;
};

export async function insertActivityProposalHistoryEntrie(
  TEST_ACTIVITY_PROPOSAL_HISTORY_ENTRIE: TestActivityProposalHistoryEntrie,
) {
  const createActivityProposalHistoryEntrie =
    await container.getAsync<CreateActivityProposalHistoryEntrie>(
      Token.CREATE_ACTIVITY_PROPOSAL_HISTORY_ENTRIE,
    );
  await createActivityProposalHistoryEntrie.run(
    TEST_ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id,
    TEST_ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId,
    TEST_ACTIVITY_PROPOSAL_HISTORY_ENTRIE.userId,
    TEST_ACTIVITY_PROPOSAL_HISTORY_ENTRIE.createdAt,
  );
}
