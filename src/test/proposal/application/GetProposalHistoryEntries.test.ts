import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetProposalHistoryEntries } from "../../../proposal/application/use-cases/GetProposalHistoryEntries.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";

describe("Get proposal history entries use case tests", () => {
  const historyEntries = [
    {
      user: {
        id: MANOLO_LOPEZ.id,
        name: MANOLO_LOPEZ.name,
        username: MANOLO_LOPEZ.username,
        profilePicture: MANOLO_LOPEZ.profilePicture,
      },
      createdAt: new Date(),
      intent: "CREATE",
    },
  ];

  beforeEach(() => {
    proposalReadModelRepo.getHistoryEntries = vi
      .fn()
      .mockResolvedValue(historyEntries);
  });

  const proposalReadModelRepo = {
    getOneById: vi.fn(),
    getAllByUserId: vi.fn(),
    getAllByPostId: vi.fn(),
    getHistoryEntries: vi.fn(),
  };

  const getProposalHistoryEntries = new GetProposalHistoryEntries(
    proposalReadModelRepo,
  );

  it("Should get the proposal history entries successfully", async () => {
    const result = await getProposalHistoryEntries.run(TWO_STEP_PROPOSAL.id);

    expect(proposalReadModelRepo.getHistoryEntries).toBeCalledTimes(1);
    expect(result).toEqual(historyEntries);
  });

  it("Should return an empty array when there are no history entries", async () => {
    proposalReadModelRepo.getHistoryEntries = vi.fn().mockResolvedValue([]);

    const result = await getProposalHistoryEntries.run(TWO_STEP_PROPOSAL.id);

    expect(result).toEqual([]);
  });
});
