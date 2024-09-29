import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SubmissionDetails from "./stories/SubmissionDetails";
import SubmissionThread from "./stories/SubmissionThread";
import { Submission } from "./models/submission";
import { User } from "./models/user";
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

interface Comment {
  id: string;
  user: User;
  postedAt: string;
  content: string;
}

export default function ViewSubmission() {
  const { id } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissionAndComments = async () => {
      try {
        const [submissionResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:8000/submission/${id}`),
          axios.get(`http://localhost:8000/comments/${id}`)
        ]);

        const submissionData = submissionResponse.data;
        const user = new User(
          submissionData.user.ic,
          submissionData.user.name,
          submissionData.user.phoneNo,
          submissionData.user.email,
          submissionData.user.privilege,
          submissionData.user.avatar
        );

        const formattedSubmission = new Submission(
          submissionData.id,
          submissionData.type,
          submissionData.subject,
          submissionData.body,
          submissionData.datetime,
          submissionData.agency,
          submissionData.tags,
          submissionData.status,
          user,
          submissionData.vote
        );

        setSubmission(formattedSubmission);

        const formattedComments = commentsResponse.data.map((comment: any) => ({
          id: comment.id,
          user: new User(
            comment.user.ic,
            comment.user.name,
            comment.user.phoneNo,
            comment.user.email,
            comment.user.privilege,
            comment.user.avatar
          ),
          postedAt: comment.postedAt,
          content: comment.comment
        }));

        setComments(formattedComments);
        setLoading(false);
      } catch (err) {
        setError('Error fetching submission details and comments');
        setLoading(false);
      }
    };

    fetchSubmissionAndComments();
  }, [id]);

  const handleVote = async (id: any, direction: string) => {
    try {
      const response = await axios.put(`http://localhost:8000/submission/${id}/vote`, {
        vote_change: direction === 'up' ? 1 : -1
      });
      console.log('Vote updated:', response.data);
      // Update the local state
      if (submission) {
        setSubmission(new Submission(
          submission.id,
          submission.type,
          submission.subject,
          submission.body,
          submission.datetime,
          submission.agency,
          submission.tags,
          submission.status,
          submission.user,
          response.data.new_vote
        ));
      }
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !submission) return;

    try {
      const response = await axios.post('http://localhost:8000/add_comment', {
        user: submission.user,
        postedAt: new Date().toISOString(),
        comment: newComment,
        submission_id: submission.id
      });

      const addedComment: Comment = {
        id: response.data.id,
        user: submission.user,
        postedAt: new Date().toISOString(),
        content: newComment
      };

      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!submission) return <div>No submission found</div>;

  return (
    <Box>
      <SubmissionDetails
        submission={submission}
        onVote={handleVote}
      />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Comments</Typography>
      <SubmissionThread comments={comments} />
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Comment
        </Button>
      </Box>
    </Box>
  );
}