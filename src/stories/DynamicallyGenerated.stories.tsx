import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DynamicallyGenerated from "../examples/DynamicallyGenerated";

export default {
  title: 'Dynamically Generated',
  component: DynamicallyGenerated
} as ComponentMeta<typeof DynamicallyGenerated>;

const Template: ComponentStory<typeof DynamicallyGenerated> = (args) => <DynamicallyGenerated {...args} />

export const Primary = Template.bind({});