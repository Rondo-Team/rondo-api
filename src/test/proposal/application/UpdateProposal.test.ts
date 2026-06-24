import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdateProposal } from "../../../proposal/application/use-cases/UpdateProposal.ts";
import { ProposalIsAlreadyClosedError } from "../../../proposal/domain/errors/ProposalIsAlreadyClosedError.ts";
import { ProposalNotFoundByIdError } from "../../../proposal/domain/errors/ProposalNotFoundByIdError.ts";
import { UnauthorizedUserActionError } from "../../../shared/domain/errors/UnauthorizedUserActionError.ts";
import { TWO_STEP_PROPOSAL } from "../../../shared/utils/domain/fixtures/proposals.ts";
import { PEDRO_MARTINEZ } from "../../../shared/utils/domain/fixtures/users.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";

describe("Update proposal use case tests", () => {
  let mockProposal;

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

  const updateProposal = new UpdateProposal(proposalRepo);

  beforeEach(() => {
    vi.clearAllMocks();

    mockProposal = {
      ...TWO_STEP_PROPOSAL,
      userId: new UserId(TWO_STEP_PROPOSAL.userId),
      isClosed: vi.fn().mockReturnValue(false),
      changeTitle: vi.fn(),
      changeDescription: vi.fn(),
      changePlay: vi.fn(),
      registerUpdate: vi.fn(),
    };

    proposalRepo.getOneById = vi.fn().mockResolvedValue(mockProposal);
  });

  it("should update all provided fields successfully", async () => {
    await updateProposal.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
      TWO_STEP_PROPOSAL.title,
      TWO_STEP_PROPOSAL.description,
      TWO_STEP_PROPOSAL.play,
    );

    expect(mockProposal.changeTitle).toBeCalledTimes(1);
    expect(mockProposal.changeDescription).toBeCalledTimes(1);
    expect(mockProposal.changePlay).toBeCalledTimes(1);
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should record an edit history entry with the actor", async () => {
    await updateProposal.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
      TWO_STEP_PROPOSAL.title,
      TWO_STEP_PROPOSAL.description,
      TWO_STEP_PROPOSAL.play,
    );

    expect(mockProposal.registerUpdate).toBeCalledTimes(1);
    const [actorUserId] = mockProposal.registerUpdate.mock.calls[0];
    expect(actorUserId.toPrimitives()).toBe(TWO_STEP_PROPOSAL.userId);
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should update only provided fields", async () => {
    await updateProposal.run(
      TWO_STEP_PROPOSAL.id,
      TWO_STEP_PROPOSAL.userId,
      TWO_STEP_PROPOSAL.title,
      undefined,
      undefined,
    );

    expect(mockProposal.changeTitle).toBeCalledTimes(1);
    expect(mockProposal.changeDescription).not.toBeCalled();
    expect(mockProposal.changePlay).not.toBeCalled();
    expect(proposalRepo.edit).toBeCalledTimes(1);
  });

  it("should not record an edit history entry if it is already closed", async () => {
    mockProposal.isClosed = vi.fn().mockReturnValue(true);

    await expect(
      async () =>
        await updateProposal.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.play,
        ),
    ).rejects.toThrow(ProposalIsAlreadyClosedError);
    expect(mockProposal.registerUpdate).not.toBeCalled();
  });

  it("should not update a proposal if it is already closed", async () => {
    mockProposal.isClosed = vi.fn().mockReturnValue(true);

    await expect(
      async () =>
        await updateProposal.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.play,
        ),
    ).rejects.toThrow(ProposalIsAlreadyClosedError);
    expect(proposalRepo.edit).not.toBeCalled();
  });

  it("should not update a proposal if user does not own it", async () => {
    await expect(
      async () =>
        await updateProposal.run(
          TWO_STEP_PROPOSAL.id,
          PEDRO_MARTINEZ.id,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.play,
        ),
    ).rejects.toThrow(UnauthorizedUserActionError);
    expect(proposalRepo.edit).not.toBeCalled();
  });

  it("should not update a proposal if it does not exist", async () => {
    proposalRepo.getOneById = vi.fn().mockResolvedValue(null);

    await expect(
      async () =>
        await updateProposal.run(
          TWO_STEP_PROPOSAL.id,
          TWO_STEP_PROPOSAL.userId,
          TWO_STEP_PROPOSAL.title,
          TWO_STEP_PROPOSAL.description,
          TWO_STEP_PROPOSAL.play,
        ),
    ).rejects.toThrow(ProposalNotFoundByIdError);
  });
});
