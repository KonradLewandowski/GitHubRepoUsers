import {
  cleanup,
  findByTestId,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Item from "../item.component";

const itemTest = {
  url: "https://test.test",
  name: "test",
  id: 0,
};

describe("Item Component", () => {
  test("rendered item element", () => {
    render(<Item item={itemTest} active={true} />);
    const item = screen.queryByTestId("item-element");
    expect(item).toBeTruthy();
  });

  test("show name from the item", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Item item={itemTest} active={true} />);
      const item = await screen.findByTestId("item-element");
      await fireEvent.change(item, { target: { value: itemTest.name } });
      expect(item.innerHTML).toBe(itemTest.name);
    });
  });
});
