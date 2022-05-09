import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import SimpleSubForm from "../examples/SimpleSubForm";

export default {
  title: "SimpleSubForm",
  component: SimpleSubForm,
} as ComponentMeta<typeof SimpleSubForm>;

const Template: ComponentStory<typeof SimpleSubForm> = (args) => (
  <SimpleSubForm {...args} />
);

export const Primary = Template.bind({});
