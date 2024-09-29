import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UnknownPage() {
  return (
    <Stack
      direction="column"
      sx={{
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Unknown Page.</Typography>
      <Typography variant="subtitle1">
        You have gone to somewhere unknown. <Link to="/">Bring me home.</Link>
      </Typography>
    </Stack>
  );
}
