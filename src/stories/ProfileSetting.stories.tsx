import type { Meta, StoryObj } from "@storybook/react";
import ProfileSetting from "./ProfileSetting";
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

const meta: Meta<typeof ProfileSetting> = {
  component: ProfileSetting,
  title: "ProfileSetting",
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
    onDeleteRequested: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ProfileSetting>;

export const Default: Story = {
  args: {
    user: user,
  },
};
