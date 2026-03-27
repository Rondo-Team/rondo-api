import { DraftId } from "../../../draft/domain/value-objects/DraftId.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { TypeOfItemUnsupportedError } from "../errors/TypeOfItemUnsupportedError.ts";
import { RecentlyViewedItemType } from "../types/RecentlyViewedItemType.ts";
export type Item = {
  id: PostId | DraftId;
  type: RecentlyViewedItemType;
  openedAt: Date;
};

export class RecentlyViewedItem {
  readonly value: Item;
  constructor(value: Item) {
    this.value = value;
  }

  toPrimitives() {
    return {
      id: this.value.id.toPrimitives(),
      type: this.value.type,
      openedAt: this.value.openedAt,
    };
  }

  static fromPrimitives(data: { id: string; type: string; openedAt: Date }) {
    return new RecentlyViewedItem(this.createSmartItem(data));
  }

  private static createSmartItem(data: {
    id: string;
    type: string;
    openedAt: Date;
  }) {
    let fixedData: Item;
    switch (data.type) {
      case RecentlyViewedItemType.DRAFT:
        fixedData = {
          id: DraftId.fromPrimitives(data.id),
          type: RecentlyViewedItemType.DRAFT,
          openedAt: data.openedAt,
        };
        break;
      case RecentlyViewedItemType.POST:
        fixedData = {
          id: PostId.fromPrimitives(data.id),
          type: RecentlyViewedItemType.POST,
          openedAt: data.openedAt,
        };
        break;
      default:
        throw new TypeOfItemUnsupportedError();
    }
    return fixedData;
  }

  equals(otherItem: RecentlyViewedItem) {
    const otherItemPrimitives = otherItem.toPrimitives();
    return (
      this.value.id.toPrimitives() === otherItemPrimitives.id &&
      this.value.type === otherItemPrimitives.type
    );
  }
}
