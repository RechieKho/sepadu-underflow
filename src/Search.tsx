import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Search() {
  const params = useParams();

  return <Typography variant="h3">Searching {params.query}</Typography>;
}
