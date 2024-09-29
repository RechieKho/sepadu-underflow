import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import UserBar from "./UserBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/UserBar",
  component: UserBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "multi-select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    maxWidth: "sm",
    userName: "John Doe",
    onAddRequested: fn(),
  },
} satisfies Meta<typeof UserBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
