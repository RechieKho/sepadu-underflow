import type { Meta, StoryObj } from '@storybook/react';

import { User } from '../models/user';

import SubmissionThread from './SubmissionThread';

const meta = {
  component: SubmissionThread,
} satisfies Meta<typeof SubmissionThread>;

export default meta;

const user1 = new User('123456', 'SSYOK', '1234567890', 'ssyok@example.com', 'community', 'https://example.com/avatar1.jpg');
const user2 = new User('789012', 'Anwar', '0987654321', 'anwar@example.com', 'admin', 'https://example.com/avatar2.jpg');

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comments: [
      {
        id: '1',
        user: user1,
        postedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hour ago
        content: "Ringgit Malaysia to the moon!"
      },
      {
        id: '2',
        user: user2,
        postedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        content: "Ya betul!"
      },
    ],
  },
};