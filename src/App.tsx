import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3"> Vite + React </Typography>
      <Button onClick={() => setCount((current) => current + 1)}>
        Count is {count}
      </Button>
    </Container>
  );
}

export default App;
