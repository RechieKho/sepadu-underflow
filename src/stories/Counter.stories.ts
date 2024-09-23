import type { Meta, StoryObj } from "@storybook/react";

import Counter from "./Counter";

const meta = {
  title: "Example/Counter",
  component: Counter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Counter",
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Crazy: Story = {
  args: {
    title: "This is Crazy",
  },
};
