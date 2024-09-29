import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Submission } from "../models/submission";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SubmissionTable from "../stories/SubmissionTable";

interface SubmissionTableEntry {
  id: number;
  title: string;
  type: string;
  tag: string;
  status: string;
  date: Date;
  upvote: number;
  agency: string;
  body: string;
  user: string;
}

const VectorDBHandler: React.FC = () => {
  const [queryResults, setQueryResults] = useState<SubmissionTableEntry[]>([]);
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      handleHybridSearch(query);
    }
  }, [query]);

  const handleHybridSearch = async (searchQuery: string) => {
    try {
      const { data } = await axios.get("https://localhost:8000/hybrid_search", {
        params: { query: searchQuery },
      });
      const formattedSubmissions = data.map((submission: Submission) => ({
        id: Number(submission.id),
        title: submission.subject,
        type: submission.type,
        tag: submission.tags[0],
        status: submission.status,
        date: new Date(submission.datetime),
        upvote: submission.vote,
        agency: submission.agency,
        body: submission.body,
        user: submission.user,
      }));
      setQueryResults(formattedSubmissions);
    } catch (error) {
      console.error("Error performing hybrid search:", error);
      alert("Failed to perform hybrid search");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Results for: {query}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/addSubmission")}
        style={{ marginBottom: "20px" }}
      >
        Add New Submission
      </Button>

      <SubmissionTable
        entries={queryResults}
        onRowClick={(params) => navigate(`/submission/${params.id}`)}
      />
    </div>
  );
};

export default VectorDBHandler;
