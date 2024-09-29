import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    onSearchRequested: fn(),
    onHomeRequested: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
