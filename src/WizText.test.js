import React from "react";
import userEvent, { specialChars } from "@testing-library/user-event";
import { ErrorBoundary } from "react-error-boundary";

import {
  render,
  cleanup,
  waitFor,
  getByTestId,
  findByText,
  clearInput,
} from "test-utils";
import WizText from "./WizText";
import { genTextField } from "wizard/utils.ts";
import { debug } from "console";

afterEach(cleanup);

test("<WizText /> with a string accessor", () => {
  const { getByTestId } = render(<WizText accessor="apples" />, {
    initialFormState: { apples: genTextField() },
  });
  const input = getByTestId("wiz-text-input");
  const testString = "cheerios are not a replacement for good liquor";
  userEvent.type(input, testString);
  expect(input.value).toBe(testString);
});

test("<WizText /> with an accessor prop, no name", () => {
  const { getByTestId } = render(
    <WizText accessor={(state) => state.apples} />,
    {
      initialFormState: { apples: genTextField() },
    }
  );
  const input = getByTestId("wiz-text-input");
  const testString = "crispix are not a replacement for good liquor";
  userEvent.type(input, testString);
  expect(input.value).toBe(testString);
  clearInput(input);
  expect(input.value).toBe("");
});

test("<WizText /> called with no accessor or name", async () => {
  const fallbackRender = jest.fn(() => null);
  jest.spyOn(console, "error").mockImplementation(() => {});
  render(
    <ErrorBoundary fallbackRender={fallbackRender}>
      <WizText />
    </ErrorBoundary>
  );
  await waitFor(() => expect(fallbackRender).toHaveBeenCalled());
  expect(fallbackRender).toHaveBeenCalled();
});

test("<WizText /> called to have validation errors", () => {
  const errorMessageQ = "Input may not include the letter Q";
  const errorMessageLength = "Input must be less than 20 characters";
  // const errorMessageLength = "Input is too long"
  const { getByTestId, debug, queryByText } = render(
    <WizText
      accessor="apples"
      required
      validations={[
        { rule: (value) => !value.includes("q"), message: errorMessageQ },
        { rule: (value) => value.length < 20, message: errorMessageLength },
      ]}
    />,
    {
      initialFormState: { apples: genTextField() },
    }
  );
  const input = getByTestId("wiz-text-input");
  expect(queryByText("This field is required")).toBeTruthy();
  userEvent.type(input, "after q is r");
  expect(queryByText("This field is required")).toBeFalsy();
  expect(queryByText(errorMessageQ)).toBeTruthy();
  userEvent.type(input, "this will put it over the limit");
  expect(queryByText(errorMessageLength)).toBeTruthy();
  clearInput(input);
  expect(queryByText("This field is required")).toBeTruthy();
});

test("<WizText /> called with a default state, with one validation error", () => {
  const errorMessageQ = "Input may not include the letter Q";
  const { getByTestId, debug, queryByText } = render(
    <WizText
      accessor="apples"
      validations={[
        { rule: (value) => !value.includes("q"), message: errorMessageQ },
      ]}
    />,
    { initialFormState: { apples: genTextField("are p nast and q") } }
  );
  const input = getByTestId("wiz-text-input");
  expect(input.value).toBe("are p nast and q");
  expect(queryByText("This field is required")).toBeFalsy();
  expect(queryByText(errorMessageQ)).toBeTruthy();
  clearInput(input);
  expect(queryByText("This field is required")).toBeTruthy();
  expect(queryByText(errorMessageQ)).toBeFalsy();
});

// test("<WizText /> called with a name, and no default state. Should create it's own place in form state", () => {
//   const { getByTestId, debug, queryByText } = render(
//     <WizText accessor="favoriteApple" />
//   );
//   const input = getByTestId("wiz-text-input");
//   userEvent.type(input, "whats all this then");
//   expect(input.value).toBe("whats all this then");
// });
