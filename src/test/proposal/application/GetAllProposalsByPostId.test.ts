import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { GetAllProposalsByPostId } from "../../../proposal/application/use-cases/GetAllProposalsByPostId.ts";
import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";

describe("Get all proposals by post id use case tests", () => {
  beforeEach(() => {
    const mockProposal = {
      ...TWO_STEP_PROPOSAL,
      proposalId: new ProposalId(TWO_STEP_PROPOSAL.id),
      postId: new PostId(ONE_STEP_POST.id),
    };
    proposalRepo.getAllByPostId = vi.fn().mockResolvedValue([mockProposal]);
    postRepo.getOneById = vi.fn().mockResolvedValue(ONE_STEP_POST);
  });

  const proposalRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAll: vi.fn(),
    getAllByUserId: vi.fn(),
    getAllByPostId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    getByCriteria: vi.fn(),
  };

  const postRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getAll: vi.fn(),
    getAllByUserId: vi.fn(),
    existsWithId: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
    getByCriteria: vi.fn(),
  };

  const getAllProposalsByPostId = new GetAllProposalsByPostId(
    proposalRepo,
    postRepo,
  );

  it("Should get all proposals successfully", async () => {
    await getAllProposalsByPostId.run(ONE_STEP_POST.id);
    expect(proposalRepo.getAllByPostId).toBeCalledTimes(1);
  });

  it("should not get proposals for a non existing post", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(undefined);

    await expect(
      async () => await getAllProposalsByPostId.run(ONE_STEP_POST.id),
    ).rejects.toThrow(PostNotFoundByIdError);
  });
});
