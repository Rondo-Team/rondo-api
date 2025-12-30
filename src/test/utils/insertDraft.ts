import { Token } from "../../config/domain/Token.ts";
import { container } from "../../container.ts";
import type { CreateDraft } from "../../draft/application/use-cases/CreateDraft.ts";
import type { PlayDTO } from "../../shared/application/dtos/PlayDTO.ts";

type TestDraft = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
  play: PlayDTO;
};

export async function insertDraft(TEST_DRAFT: TestDraft) {
  const createDraft = await container.getAsync<CreateDraft>(Token.CREATE_DRAFT);
  await createDraft.run(
    TEST_DRAFT.id,
    TEST_DRAFT.userId,
    TEST_DRAFT.title,
    TEST_DRAFT.description,
    TEST_DRAFT.createdAt,
    TEST_DRAFT.play
  );
}
