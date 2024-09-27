import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, ChipProps, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Submission } from '../models/submission';

interface SubmissionDetailsProps {
    submission: Submission;
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
    backgroundColor: status === 'open' ? theme.palette.success.main : status === 'in progress' ? theme.palette.warning.main : theme.palette.error.main,
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
    submission,
    onVote,
}) => {
    const [localVote, setLocalVote] = useState(submission.vote);

    const handleVote = (direction: 'up' | 'down') => {
        setLocalVote(prev => direction === 'up' ? prev + 1 : prev - 1);
        onVote(submission.id, direction);
        console.log(`update vote - ${direction}vote for ${submission.id}`);
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
                    <StatusChip 
                        label={submission.status} 
                        status={submission.status.toLowerCase()} 
                    />
                    <Typography variant="h5" gutterBottom>{submission.subject}</Typography>
                    <Typography variant="body1"><strong>Type:</strong> {submission.type}</Typography>
                    <Typography variant="body1"><strong>Agency:</strong> {submission.agency}</Typography>
                    <Typography variant="body1"><strong>User:</strong> {submission.user.getDisplayName()}</Typography>
                    {submission.user.isAdmin() && <Chip label="Admin" color="primary" size="small" />}
                    <br/>
                    <Typography variant="body1">{submission.body}</Typography>
                    <Box mt={2}>
                        <Typography variant="body1" component="span"><strong>Tags:</strong></Typography>
                        {submission.tags.map((tag, index) => (
                            <TagChip key={index} label={tag} size="small" />
                        ))}
                    </Box>
                    <Typography variant="body2">Posted {submission.getTimeAgo()}</Typography>
                </Box>
            </Box>
        </StyledPaper>
    );
};

export default SubmissionDetails;