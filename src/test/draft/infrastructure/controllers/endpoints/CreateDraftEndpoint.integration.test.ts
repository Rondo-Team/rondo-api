import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { TWO_STEPS_DRAFT } from "../../../../../shared/utils/domain/fixtures/drafts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { insertDraft } from "../../../../utils/insertDraft.ts";
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
        id: TWO_STEPS_DRAFT.id,
        title: TWO_STEPS_DRAFT.title,
        description: TWO_STEPS_DRAFT.description,
        play: TWO_STEPS_DRAFT.play,
      }),
    });
    expect(res.status).toBe(201);
  });
});

it("should not create draft with an existent id", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  // Insert first element
  await insertDraft(TWO_STEPS_DRAFT);

  // Insert second element
  const res = await app.request("/api/v1/drafts", {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: TWO_STEPS_DRAFT.id,
      title: TWO_STEPS_DRAFT.title,
      description: TWO_STEPS_DRAFT.description,
      play: TWO_STEPS_DRAFT.play,
    }),
  });

  expect(res.status).toBe(409);
});
