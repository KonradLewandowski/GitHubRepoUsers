import { useEffect, useState } from "react";

import { Result } from "../../interfaces/Service";

import Item from "../item/item.component";

import { ItemsContainer } from "./items.styles";

import { useKeyPress } from "../../hooks/keyboardAccessibility";

const Items = ({ items, isError }: { items: Result[]; isError: boolean }) => {
  const [cursor, setCursor] = useState(0);

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");

  const focusedElement = () => {
    const element: HTMLDivElement | null = document.querySelector(".active");

    if (element) element.focus();
  };

  useEffect(() => {
    if (items.length && downPress) {
      setCursor((prevState) =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    }

    focusedElement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downPress]);

  useEffect(() => {
    if (items.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }

    focusedElement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upPress]);

  return (
    <ItemsContainer>
      {isError ? (
        <div data-testid="error-message" className="error">
          Something went wrong!
        </div>
      ) : (
        <div className="ok">{items.length} matches</div>
      )}
      {/* ///////////////////////////////// */}
      {items.length ? (
        <div className="result" data-testid="items-list">
          {items.map((item: Result, i: number) => {
            return <Item key={i} active={i === cursor} item={item} />;
          })}
        </div>
      ) : null}
    </ItemsContainer>
  );
};

export default Items;
