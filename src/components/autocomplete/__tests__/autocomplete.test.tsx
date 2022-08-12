import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Autocomplete from "../autocomplete";

it("should render Autocomplete Component", () => {
  const serviceMock = jest.fn();
  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const autocomplete = screen.queryByTestId("autocomplete-container");

  expect(autocomplete).toBeInTheDocument();
});

it("should call API when get at least 3 characters", async () => {
  const serviceMock = jest.fn();
  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  await waitFor(() => expect(serviceMock).toBeCalled());
});

it("should not call API when get less than 3 characters", () => {
  const serviceMock = jest.fn();
  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "ab" } });

  expect(serviceMock).not.toBeCalled();
});

it("if API responses should render resault box", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockReturnValueOnce(Promise.resolve([{ id: 1, name: "abc", url: "" }]));

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const result = await screen.findByTestId("item-element-0");
  expect(result).toBeInTheDocument();
});

it("if API responses should sort alphabetically", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockReturnValueOnce(
    Promise.resolve([
      { id: 1, name: "abcz", url: "" },
      { id: 2, name: "abca", url: "" },
    ])
  );

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const itemsList = await screen.findByTestId("items-list");
  const childNodes = itemsList.childNodes;

  expect(childNodes[0].textContent).toEqual("abca");
  expect(childNodes[1].textContent).toEqual("abcz");
});

it("if API responsed should be limited to 50 results per request", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockReturnValueOnce(
    Promise.resolve(new Array(100).fill({ id: 1, name: "abcd", url: "" }))
  );

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const itemsList = await screen.findByTestId("items-list");
  const childNodes = itemsList.childNodes.length;

  expect(childNodes).toBeLessThan(51);
});

it("if user click Arrow Down the class is changing", async () => {
  window.open = jest.fn();

  const serviceMock = jest.fn();

  serviceMock.mockReturnValueOnce(
    Promise.resolve(new Array(2).fill({ id: 1, name: "abcd", url: "" }))
  );

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const itemElement0 = await screen.findByTestId("item-element-0");
  const itemElement1 = await screen.findByTestId("item-element-1");

  userEvent.type(itemElement0, "{arrowdown}");

  expect(itemElement1).toHaveClass("active");
});

it("if user click Arrow Up the class is changing", async () => {
  window.open = jest.fn();

  const serviceMock = jest.fn();

  serviceMock.mockReturnValueOnce(
    Promise.resolve(new Array(3).fill({ id: 1, name: "abcd", url: "" }))
  );

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const itemElement0 = await screen.findByTestId("item-element-0");
  const itemElement1 = await screen.findByTestId("item-element-1");

  userEvent.type(itemElement1, "{arrowup}");

  expect(itemElement0).toHaveClass("active");
});

it("if data being fetched render Spinner Component", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockReturnValueOnce(new Promise(() => {}));

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const spinner = await screen.findByTestId("spinner");

  expect(spinner).toBeInTheDocument();
});

it("if API responses should show matches found", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockReturnValueOnce(
    Promise.resolve(new Array(10).fill({ id: 1, name: "abcd", url: "" }))
  );

  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const maches = await screen.findByTestId("ok-message");

  await waitFor(() => expect(maches.textContent).toEqual("10 matches"));
});

it("if API does not response should throw an error", async () => {
  const serviceMock = jest.fn();
  serviceMock.mockRejectedValueOnce(new Error("Something went wrong!"));
  render(<Autocomplete gitHubSearchService={serviceMock} />);

  const input = screen.getByPlaceholderText("search");

  fireEvent.change(input, { target: { value: "abc" } });

  const error = await screen.findByTestId("error-message");

  expect(error).toBeInTheDocument();
});
