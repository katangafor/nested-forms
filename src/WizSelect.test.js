import React from "react";
import selectEvent from "react-select-event";
import "@testing-library/jest-dom/extend-expect";

import { render, cleanup } from "test-utils";
import WizSelect from "./WizSelect";
import { genSelectField } from "wizard/utils.ts";

afterEach(cleanup);

test("Render <WizSelect />", async () => {
  const { getByLabelText, getByText } = render(
    <WizSelect
      label="Food"
      options={[{ label: "Strawberry", value: "Strawberry" }]}
      accessor={(state) => state.food}
    />,
    {
      initialFormState: { food: genSelectField() },
    }
  );

  const wizSelect = getByLabelText('Food');
  expect(getByText("Select...")).toBeInTheDocument();
  await selectEvent.select(wizSelect, ["Strawberry"]);
  expect(getByText("Strawberry")).toBeInTheDocument();
  await selectEvent.clearAll(wizSelect);
  expect(getByText("Select...")).toBeInTheDocument();
});

// test("Render <WizSelect /> without a default state", async () => {
//   const { getByLabelText, getByText } = render(
//     <WizSelect
//       label="Food"
//       options={[{ label: "Strawberry", value: "Strawberry" }]}
//       accessor="food"
//     />
//   );

//   const wizSelect = getByLabelText("Food");
//   expect(getByText("Select...")).toBeInTheDocument();
//   await selectEvent.select(wizSelect, ["Strawberry"]);
//   expect(getByText("Strawberry")).toBeInTheDocument();
//   await selectEvent.clearAll(wizSelect);
//   expect(getByText("Select...")).toBeInTheDocument();
// })