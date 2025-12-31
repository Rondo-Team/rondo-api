import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { SAMPLE_DRAFT } from "../../../../../shared/utils/domain/fixtures/drafts.ts";
import {
  MANOLO_LOPEZ,
  PEDRO_MARTINEZ,
} from "../../../../../shared/utils/domain/fixtures/users.ts";
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

describe("delete draft by id endpoint tests", () => {
  it("should delete a draft by id successfully", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);
    await insertDraft(SAMPLE_DRAFT);

    const res = await app.request(`/api/v1/drafts/${SAMPLE_DRAFT.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(res.status).toBe(200);
  });
});

it("should not delete draft if it does not exists", async () => {
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(MANOLO_LOPEZ);

  const res = await app.request(`/api/v1/drafts/${SAMPLE_DRAFT.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  expect(res.status).toBe(404);
});

it("should not delete draft if user does not own it", async () => {
  await registerUser(PEDRO_MARTINEZ);
  await registerUser(MANOLO_LOPEZ);
  const accessToken = await loginUser(PEDRO_MARTINEZ);
  await insertDraft(SAMPLE_DRAFT);

  const res = await app.request(`/api/v1/drafts/${SAMPLE_DRAFT.id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  expect(res.status).toBe(401);
});