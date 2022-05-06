import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import SimpleTextForm from "../examples/SimpleTextForm";

export default {
  title: "Simple Text Form",
  component: SimpleTextForm,
} as ComponentMeta<typeof SimpleTextForm>;

const Template: ComponentStory<typeof SimpleTextForm> = (args) => (
  <SimpleTextForm {...args} />
);

export const Primary = Template.bind({});
