import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import MultipleFields from "../examples/MultipleFieldTypes";

export default {
  title: "Multiple Fields",
  component: MultipleFields,
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof MultipleFields>;

const Template: ComponentStory<typeof MultipleFields> = (args) => (
  <MultipleFields {...args} />
);

export const Primary = Template.bind({});
