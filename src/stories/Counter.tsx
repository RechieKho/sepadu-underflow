import "./fonts";
import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";

export interface CounterProps {
  title?: string;
}

function Counter({ title }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="sm">
      <Typography>{title || "Default Title"}</Typography>
      <Button onClick={() => setCount((current) => current + 1)}>
        Count is {count}
      </Button>
    </Container>
  );
}

export default Counter;
