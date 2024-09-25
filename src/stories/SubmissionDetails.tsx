import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, ChipProps, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { User } from '../models/user';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface SubmissionDetailsProps {
    id: string;
    type: string;
    subject: string;
    body: string;
    datetime: string;
    agency: string;
    tags: string[];
    status: string;
    user: User;
    vote: number;
    onVote: (id: string, direction: 'up' | 'down') => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
}));

interface StatusChipProps {
    status: string;
}

const StatusChip = styled(({ status, ...props }: StatusChipProps & ChipProps) => <Chip {...props} />)(({ theme, status }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: status === 'open' ? theme.palette.success.main : theme.palette.error.main,
    color: theme.palette.common.white,
}));

const TagChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
}));

const VoteContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(2),
}));

const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({
    id,
    type,
    subject,
    body,
    datetime,
    agency,
    tags,
    status,
    user,
    vote,
    onVote,
}) => {
    const [localVote, setLocalVote] = useState(vote);

    const handleVote = (direction: 'up' | 'down') => {
        // Update local state immediately for responsiveness
        setLocalVote(prev => direction === 'up' ? prev + 1 : prev - 1);

        // Call the onVote callback to update the backend
        onVote(id, direction);

        // Temporary console log
        console.log(`update vote - ${direction}vote for ${id}`);
    };
    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    return (
        <StyledPaper elevation={3}>
            <Box display="flex">
                <VoteContainer>
                    <IconButton onClick={() => handleVote('up')}>
                        <ArrowUpwardIcon />
                    </IconButton>
                    <Typography variant="h6">{localVote}</Typography>
                    <IconButton onClick={() => handleVote('down')}>
                        <ArrowDownwardIcon />
                    </IconButton>
                </VoteContainer>
                <Box flexGrow={1}>
                    <StatusChip label={status} status={status.toLowerCase()} />
                    <Typography variant="h5" gutterBottom>{subject}</Typography>
                    <Typography variant="body1"><strong>Type:</strong> {type}</Typography>
                    <Typography variant="body1"><strong>Agency:</strong> {agency}</Typography>
                    <Typography variant="body1"><strong>User:</strong> {user.getDisplayName()}</Typography>
                    <br/>
                    <Typography variant="body1">{body}</Typography>
                    <Box mt={2}>
                        <Typography variant="body1" component="span"><strong>Tags:</strong></Typography>
                        {tags.map((tag, index) => (
                            <TagChip key={index} label={tag} size="small" />
                        ))}
                    </Box>
                    <Typography variant="body2">Posted {getTimeAgo(datetime)}</Typography>
                </Box>
            </Box>
        </StyledPaper>
    );
};

export default SubmissionDetails;