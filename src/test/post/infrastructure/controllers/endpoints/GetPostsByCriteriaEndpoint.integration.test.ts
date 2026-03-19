import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Token } from "../../../../../config/domain/Token.ts";
import { container } from "../../../../../container.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";
import { clearTestDatabase } from "../../../../utils/clearTestDatabase.ts";
import { insertPost } from "../../../../utils/insertPost.ts";
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

function makePost(params: {
  id: string;
  title: string;
  favouritesCount: number;
  createdAt: Date;
}) {
  return {
    ...ONE_STEP_POST,
    id: params.id,
    title: params.title,
    favouritesCount: params.favouritesCount,
    createdAt: params.createdAt,
  };
}

describe("get post by criteria endpoint tests", () => {
  it("should reject requests without the required pagination params", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    const res = await app.request(`/api/v1/posts?query=one`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(400);
  });

  it("should return the first page sorted by title asc with pagination metadata", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440010",
        title: "Charlie post",
        favouritesCount: 10,
        createdAt: new Date("2025-01-03T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440011",
        title: "Alpha post",
        favouritesCount: 30,
        createdAt: new Date("2025-01-01T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440012",
        title: "Bravo post",
        favouritesCount: 20,
        createdAt: new Date("2025-01-02T10:00:00.000Z"),
      }),
    );

    const res = await app.request(
      `/api/v1/posts?page=1&limit=2&sortBy=title&sortOrder=asc`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      total: 3,
      page: 1,
      limit: 2,
    });
    expect(body.items).toHaveLength(2);
    expect(body.items.map((post: { title: string }) => post.title)).toEqual([
      "Alpha post",
      "Bravo post",
    ]);
  });

  it("should return the requested page after sorting by favourites count desc", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440013",
        title: "Charlie post",
        favouritesCount: 10,
        createdAt: new Date("2025-01-03T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440014",
        title: "Alpha post",
        favouritesCount: 30,
        createdAt: new Date("2025-01-01T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440015",
        title: "Bravo post",
        favouritesCount: 20,
        createdAt: new Date("2025-01-02T10:00:00.000Z"),
      }),
    );

    const res = await app.request(
      `/api/v1/posts?page=2&limit=1&sortBy=favouritesCount&sortOrder=desc`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      total: 3,
      page: 2,
      limit: 1,
    });
    expect(body.items).toHaveLength(1);
    expect(body.items[0].title).toBe("Bravo post");
    expect(body.items[0].favouritesCount).toBe(20);
  });

  it("should paginate filtered results and keep the total for the filtered set", async () => {
    await registerUser(MANOLO_LOPEZ);
    const accessToken = await loginUser(MANOLO_LOPEZ);

    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440016",
        title: "Alpha attacking post",
        favouritesCount: 10,
        createdAt: new Date("2025-01-01T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440017",
        title: "Bravo attacking post",
        favouritesCount: 20,
        createdAt: new Date("2025-01-02T10:00:00.000Z"),
      }),
    );
    await insertPost(
      makePost({
        id: "440e8400-e29b-41d4-a716-446655440018",
        title: "Neutral build up",
        favouritesCount: 30,
        createdAt: new Date("2025-01-03T10:00:00.000Z"),
      }),
    );

    const res = await app.request(
      `/api/v1/posts?page=1&limit=1&query=attacking&sortBy=createdAt&sortOrder=asc`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      total: 2,
      page: 1,
      limit: 1,
    });
    expect(body.items).toHaveLength(1);
    expect(body.items[0].title).toBe("Alpha attacking post");
  });
});
