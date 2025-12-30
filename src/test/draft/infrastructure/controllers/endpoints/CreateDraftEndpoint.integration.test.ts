import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { CreateDraft } from "../../../../../draft/application/use-cases/CreateDraft.ts";
import { SAMPLE_DRAFT } from "../../../../../shared/utils/domain/fixtures/drafts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import {
  loginUser,
  registerUser,
} from "../../../../utils/userAuthentication.ts";

let app;

beforeAll(async () => {
  app = await container.getAsync(Token.APP);
});

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
});

describe("create draft endpoint tests", () => {
  it("should create a draft successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request("/api/v1/drafts", {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: SAMPLE_DRAFT.id,
        title: SAMPLE_DRAFT.title,
        description: SAMPLE_DRAFT.description,
        play: SAMPLE_DRAFT.play,
      }),
    });
    expect(res.status).toBe(201);
  });
});

it("should not create draft with an existent id", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  // Insert first element
  const createDraft = await container.getAsync<CreateDraft>(Token.CREATE_DRAFT);
  await createDraft.run(
    SAMPLE_DRAFT.id,
    SAMPLE_DRAFT.userId,
    SAMPLE_DRAFT.title,
    SAMPLE_DRAFT.description,
    SAMPLE_DRAFT.createdAt,
    SAMPLE_DRAFT.play
  );

  // Insert second element
  const res = await app.request("/api/v1/drafts", {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: SAMPLE_DRAFT.id,
      title: SAMPLE_DRAFT.title,
      description: SAMPLE_DRAFT.description,
      play: SAMPLE_DRAFT.play,
    }),
  });

  expect(res.status).toBe(409);
});
