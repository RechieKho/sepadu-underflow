import "./fonts";
import { Stack, Breakpoint, Container, Typography } from "@mui/material";

export interface HeaderProps {
  maxWidth?: Breakpoint | false;
  title?: string;
  aside?: string;
}

export default function Header({
  maxWidth = "lg",
  title = "SEPADU",
  aside = "Jambatan Perkhidmatan Awam",
}: HeaderProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{title}</Typography>
        <Typography>{aside}</Typography>
      </Stack>
    </Container>
  );
}
