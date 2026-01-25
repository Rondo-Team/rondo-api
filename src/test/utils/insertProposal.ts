import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import type { CreateProposal } from "../../proposal/application/use-cases/CreateProposal.ts";
import type { PlayDTO } from "../../shared/application/dtos/PlayDTO.ts";

type TestProposal = {
  id: string;
  userId: string;
  postId: string;
  title: string;
  description: string;
  createdAt: Date;
  play: PlayDTO;
};

export async function insertProposal(TEST_PROPOSAL: TestProposal) {
  const createProposal = await container.getAsync<CreateProposal>(
    Token.CREATE_PROPOSAL,
  );
  await createProposal.run(
    TEST_PROPOSAL.id,
    TEST_PROPOSAL.userId,
    TEST_PROPOSAL.postId,
    TEST_PROPOSAL.title,
    TEST_PROPOSAL.description,
    TEST_PROPOSAL.createdAt,
    TEST_PROPOSAL.play,
  );
}
