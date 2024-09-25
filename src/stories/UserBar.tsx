import {
  Breakpoint,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./fonts";
import React from "react";
import { Add } from "@mui/icons-material";

export interface CounterProps {
  maxWidth?: Breakpoint;
  userName: string;
  onAddRequested: () => void;
}

export default function UserBar({
  maxWidth = "lg",
  userName,
  onAddRequested,
}: CounterProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{userName}</Typography>
          <IconButton
            onClick={() => onAddRequested()}
            aria-label="Add a submission"
          >
            <Add />
          </IconButton>
        </Stack>
      </Paper>
    </Container>
  );
}
