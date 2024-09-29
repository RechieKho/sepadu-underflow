import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Container } from '@mui/material';
import { Submission } from '../models/submission';
import { Privilege, User } from '../models/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubmission: React.FC = () => {
  const navigate = useNavigate();
  const [submissionInput, setSubmissionInput] = useState({
    type: 'Aduan',
    subject: '',
    body: '',
    agency: '',
    tags: '',
    userIc: '012345',
    userName: 'SSYOK',
    userPhone: '012345678',
    userEmail: 'ssyok@example.com',
    userPrivilege: 'community',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubmissionInput(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmission = async () => {
    // Check if all fields are filled
    const isFormValid = Object.values(submissionInput).every(value => value.trim() !== '');

    if (!isFormValid) {
      alert('Please fill in all fields');
      return;
    }

    const newSubmission = new Submission(
      Date.now().toString(),
      submissionInput.type,
      submissionInput.subject,
      submissionInput.body,
      new Date().toISOString(),
      submissionInput.agency,
      submissionInput.tags.split(',').map(tag => tag.trim()),
      'Open',
      new User(
        submissionInput.userIc,
        submissionInput.userName,
        submissionInput.userPhone,
        submissionInput.userEmail,
        submissionInput.userPrivilege as Privilege
      ),
      0
    );

    try {
      await axios.post('http://localhost:8000/add_submission', newSubmission);
      alert('Submission added successfully');
      navigate('/'); // Navigate back to root page after successful submission
    } catch (error) {
      console.error('Error adding submission:', error);
      alert('Failed to add submission');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Add New Submission</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Type"
            name="type"
            value={submissionInput.type}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Subject"
            name="subject"
            value={submissionInput.subject}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Body"
            name="body"
            value={submissionInput.body}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            required
            label="Agency"
            name="agency"
            value={submissionInput.agency}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Tags (comma-separated)"
            name="tags"
            value={submissionInput.tags}
            onChange={handleInputChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="User IC"
            name="userIc"
            value={submissionInput.userIc}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="User Name"
            name="userName"
            value={submissionInput.userName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="User Phone"
            name="userPhone"
            value={submissionInput.userPhone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="User Email"
            name="userEmail"
            value={submissionInput.userEmail}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="User Privilege"
            name="userPrivilege"
            value={submissionInput.userPrivilege}
            onChange={handleInputChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleAddSubmission} style={{ margin: '20px 0' }}>
        Add Submission
      </Button>
    </Container>
  );
};

export default AddSubmission;