import "./fonts";
import { Breakpoint, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";

export interface FooterProps {
  maxWidth?: Breakpoint | false;
  agencyName?: string;
  copyrightYear?: number;
}

export default function Footer({
  maxWidth = "lg",
  agencyName = "SEPADU UNDERFLOW",
  copyrightYear = 2024,
}: FooterProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Stack direction="column" alignItems="center">
        <Typography>
          Copyright &copy; {copyrightYear} {agencyName}
        </Typography>
      </Stack>
    </Container>
  );
}
