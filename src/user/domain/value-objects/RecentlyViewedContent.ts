import { MAX_RECENTLY_VIEWED_ITEMS } from "../../../config/domain/Consts.ts";
import { RecentlyViewedItem } from "../../../shared/domain/value-objects/RecentlyViewedItem.ts";
import { RecentlyViewedContentHasRepeatedElementsError } from "../errors/RecentlyViewedContentHasRepeatedElementsError.ts";
import { RecentlyViewedContentIsTooLargeError } from "../errors/RecentlyViewedContentIsTooLarge.ts";

export class RecentlyViewedContent {
  readonly value: RecentlyViewedItem[];
  constructor(value: RecentlyViewedItem[]) {
    this.value = value;
    this.ensureIsValid();
  }

  toPrimitives() {
    return this.value.map((item) => item.toPrimitives());
  }

  static fromPrimitives(data: { id: string; type: string; openedAt: Date }[]) {
    return new RecentlyViewedContent(
      data.map((item) =>
        RecentlyViewedItem.fromPrimitives({
          id: item.id,
          type: item.type,
          openedAt: item.openedAt,
        }),
      ),
    );
  }

  add(newItem: RecentlyViewedItem) {
    const itemExists = this.value.some((item) => item.equals(newItem));

    const filteredItems = itemExists
      ? this.value.filter((item) => !item.equals(newItem))
      : this.value.slice(0, MAX_RECENTLY_VIEWED_ITEMS - 1);

    return new RecentlyViewedContent([newItem, ...filteredItems]);
  }

  private ensureIsValid() {
    this.checkLength();
    this.checkRepeatedElements();
  }

  private checkRepeatedElements() {
    const set = new Set(
      this.value.map(
        (item) => `${item.toPrimitives().id}:${item.toPrimitives().type}`,
      ),
    );

    if (set.size !== this.value.length)
      throw new RecentlyViewedContentHasRepeatedElementsError();
  }

  private checkLength() {
    if (this.value.length > MAX_RECENTLY_VIEWED_ITEMS)
      throw new RecentlyViewedContentIsTooLargeError();
  }
}
