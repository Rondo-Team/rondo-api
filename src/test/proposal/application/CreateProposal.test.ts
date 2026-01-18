import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostNotFoundByIdError } from "../../../post/domain/errors/PostNotFoundByIdError.ts";
import { CreateProposal } from "../../../proposal/application/use-cases/CreateProposal.ts";
import { ProposalWithIdAlreadyExistsError } from "../../../proposal/domain/errors/ProposalWithIdAlreadyExistsError.ts";
import { ONE_STEP_POST } from "../../../shared/utils/domain/fixtures/posts.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { MANOLO_LOPEZ } from "../../../shared/utils/domain/fixtures/users.ts";

describe("Create post use case tests", () => {
  beforeEach(() => {
    const mockUser = {
      ...MANOLO_LOPEZ,
      addProposal: vi.fn(),
    };
    const mockPost = {
      ...ONE_STEP_POST,
      addProposal: vi.fn(),
    };

    userRepo.getOneById = vi.fn().mockResolvedValue(mockUser);
    postRepo.existsWithId = vi.fn().mockResolvedValue(false);
    postRepo.getOneById = vi.fn().mockResolvedValue(mockPost);
  });

  const userRepo = {
    create: vi.fn(),
    getOneById: vi.fn(),
    getOneByEmail: vi.fn(),
    existsWithId: vi.fn(),
    existsWithEmail: vi.fn(),
    existsWithUsername: vi.fn(),
    edit: vi.fn(),
    deleteById: vi.fn(),
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

  const createProposal = new CreateProposal(proposalRepo, postRepo, userRepo);

  it("Should create a proposal succesfully", async () => {
    await createProposal.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
      TWO_STEP_PROPOSAL.postId,
      TWO_STEP_PROPOSAL.title,
      TWO_STEP_PROPOSAL.description,
      TWO_STEP_PROPOSAL.createdAt,
      TWO_STEP_PROPOSAL.play
    );
    expect(proposalRepo.create).toBeCalledTimes(1);
  });

  it("should not create a proposal if user post associated does not exists", async () => {
    postRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await createProposal.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.postId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.createdAt,
          TWO_STEP_PROPOSAL.play
        )
    ).rejects.toThrow(PostNotFoundByIdError);
  });

  it("should not create a proposal if id is already used", async () => {
    proposalRepo.existsWithId = vi.fn().mockResolvedValue(true);

    await expect(
      async () =>
        await createProposal.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.postId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.createdAt,
          TWO_STEP_PROPOSAL.play
        )
    ).rejects.toThrow(ProposalWithIdAlreadyExistsError);
  });
});
