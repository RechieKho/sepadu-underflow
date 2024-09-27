import type { Meta, StoryObj } from "@storybook/react";

import SubmissionTable from "./SubmissionTable";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/SubmissionTable",
  component: SubmissionTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    maxWidth: {
      control: "multi-select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    entries: [
      {
        id: 1,
        title: "Busted toilet",
        type: "Complaint",
        tag: "Welfare",
        status: "submitted",
        date: new Date(Date.now()),
        upvote: 10,
      },
      {
        id: 2,
        title: "Used needles",
        type: "Complaint",
        tag: "Health",
        status: "submitted",
        date: new Date(Date.now()),
        upvote: 1,
      },
      {
        id: 3,
        title: "Misinformation",
        type: "Complaint",
        tag: "Politics",
        status: "ongoing",
        date: new Date(Date.now()),
        upvote: 10000,
      },
    ],
    onRowClick: fn(),
  },
} satisfies Meta<typeof SubmissionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
