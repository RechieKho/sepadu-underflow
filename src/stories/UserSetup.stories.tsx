import type { Meta, StoryObj } from "@storybook/react";
import UserSetup from "./UserSetup";
import { ThemeProvider } from "@mui/material/styles";
import theme from ".././theme";
import { User } from "../models/user";
import { fn } from "@storybook/test";

const user = new User(
  "010203070809",
  "Sheeshh",
  "0123456789",
  "sheesh@example.com",
  "community",
  "https://example.com/avatar1.jpg"
);

const meta: Meta<typeof UserSetup> = {
  component: UserSetup,
  title: "UserSetup",
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  args: {
    user,
    onSubmitRequested: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UserSetup>;

export const Default: Story = {
  args: {
    user: user,
  },
};