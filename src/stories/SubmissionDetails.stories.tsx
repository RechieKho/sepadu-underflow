import type { Meta, StoryObj } from '@storybook/react';
import SubmissionDetails from './SubmissionDetails';
import { ThemeProvider } from '@mui/material/styles';
import theme from '.././theme';
import { User } from '../models/user';
import { Submission } from '../models/submission';

const user = new User(
  '123456', 
  'SSYOK', 
  '1234567890', 
  'ssyok@example.com', 
  'community', 
  'https://example.com/avatar1.jpg'
);

const submission = new Submission(
  '1',
  'Complaint',
  'Issue with local park',
  'There is a lot of litter in the local park...',
  '2024-09-20T10:30:00Z',
  'Parks Department',
  ['Environment', 'Cleanliness'],
  'Open',
  user,
  5
);

const meta: Meta<typeof SubmissionDetails> = {
  component: SubmissionDetails,
  title: 'SubmissionDetails',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SubmissionDetails>;

export const Default: Story = {
  args: {
    submission: submission
  },
};