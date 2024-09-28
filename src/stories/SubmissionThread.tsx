// SubmissionThread.tsx

import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Divider, 
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { User } from '../models/user';

interface Comment {
  id: string;
  user: User;
  postedAt: string;
  content: string;
}

interface SubmissionThreadProps {
  comments: Comment[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const CommentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginLeft: theme.spacing(1),
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CommentContent = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const AdminChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const SubmissionThread: React.FC<SubmissionThreadProps> = ({ comments }) => {
    return (
      <Box>
        {comments.map((comment, index) => (
          <StyledPaper key={comment.id} elevation={1}>
            <CommentHeader>
              <UserInfo>
                <Avatar src={comment.user.avatar} alt={comment.user.name} />
                <Username variant="body1">{comment.user.name}</Username>
                {comment.user.privilege === 'admin' && (
                  <AdminChip label="Admin" size="small" />
                )}
              </UserInfo>
              <TimeStamp variant="body2">
                {getTimeAgo(comment.postedAt)}
              </TimeStamp>
            </CommentHeader>
            <CommentContent variant="body1">
              {comment.content}
            </CommentContent>
            {index < comments.length - 1 && <Divider />}
          </StyledPaper>
        ))}
      </Box>
    );
  };
  
  export default SubmissionThread;