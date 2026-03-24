import { describe, expect, it } from "vitest";
import { MAX_RECENTLY_VIEWED_ITEMS } from "../../../../config/domain/Consts.ts";
import { DraftId } from "../../../../draft/domain/value-objects/DraftId.ts";
import { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { RecentlyViewedItemType } from "../../../../shared/domain/types/RecentlyViewedItemType.ts";
import { RecentlyViewedItem } from "../../../../shared/domain/value-objects/RecentlyViewedItem.ts";
import { RecentlyViewedContentHasRepeatedElementsError } from "../../../../user/domain/errors/RecentlyViewedContentHasRepeatedElementsError.ts";
import { RecentlyViewedContent } from "../../../../user/domain/value-objects/RecentlyViewedContent.ts";

describe("Recently viewed content tests", () => {
  const postItem = (id: string) =>
    new RecentlyViewedItem({
      id: new PostId(id),
      type: RecentlyViewedItemType.POST,
    });

  const draftItem = (id: string) =>
    new RecentlyViewedItem({
      id: new DraftId(id),
      type: RecentlyViewedItemType.DRAFT,
    });

  it("does not fail if content has no repeated items", () => {
    expect(
      () =>
        new RecentlyViewedContent([
          postItem("550e8400-e29b-41d4-a716-446655440000"),
        ]),
    ).not.toThrow();
  });

  it("throws an error if content has repeated items", () => {
    const repeatedItem = postItem("550e8400-e29b-41d4-a716-446655440000");

    expect(
      () => new RecentlyViewedContent([repeatedItem, repeatedItem]),
    ).toThrowError(RecentlyViewedContentHasRepeatedElementsError);
  });

  it("moves an existing item to the first position when adding it again", () => {
    const firstItem = postItem("550e8400-e29b-41d4-a716-446655440000");
    const secondItem = draftItem("550e8400-e29b-41d4-a716-446655440001");
    const content = new RecentlyViewedContent([firstItem, secondItem]);

    const updatedContent = content.add(firstItem);

    expect(updatedContent.toPrimitives()).toEqual([
      firstItem.toPrimitives(),
      secondItem.toPrimitives(),
    ]);
  });

  it("adds a new item to the beginning and keeps the maximum size", () => {
    const items = Array.from(
      { length: MAX_RECENTLY_VIEWED_ITEMS },
      (_, index) => postItem(`550e8400-e29b-41d4-a716-44665544000${index}`),
    );
        const content = new RecentlyViewedContent(items);
    const newItem = draftItem("550e8400-e29b-41d4-a716-446655440099");

    const updatedContent = content.add(newItem);

    expect(updatedContent.value).toHaveLength(MAX_RECENTLY_VIEWED_ITEMS);
    expect(updatedContent.toPrimitives()).toEqual([
      newItem.toPrimitives(),
      ...items
        .slice(0, MAX_RECENTLY_VIEWED_ITEMS - 1)
        .map((item) => item.toPrimitives()),
    ]);
  });
});
