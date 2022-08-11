import { KeyboardEvent } from "react";

import { Result } from "../../interfaces/Repository";

import { ItemContainer } from "./item.styles";

const Item = ({ item, active }: { item: Result; active: boolean }) => {
  return (
    <ItemContainer
      className={active ? "active" : ""}
      onClick={() => window.open(item.url, "_blank")}
      onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
        e.key === "Enter" ? window.open(item.url, "_blank") : null
      }
      tabIndex={active ? 0 : null}
      data-testid="item-element"
    >
      {item.name}
    </ItemContainer>
  );
};

export default Item;
