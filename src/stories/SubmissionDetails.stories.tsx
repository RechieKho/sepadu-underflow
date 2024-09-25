import type { Meta, StoryObj } from '@storybook/react';
import SubmissionDetails from './SubmissionDetails';
import { ThemeProvider } from '@mui/material/styles';
import theme from '.././theme';

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
    id: "Aduan#3",
    type: 'Aduan',
    subject: 'Title of Subject',
    body: 'Description of context',
    datetime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    agency: 'JPN',
    tags: ['tag1', 'tag2'],
    status: 'Open',
    user: 'SSYOK',
    vote: 5,
  },
};