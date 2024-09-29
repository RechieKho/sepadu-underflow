import { ArrowRight, Search } from "@mui/icons-material";
import "./fonts";
import {
  Stack,
  Breakpoint,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { useState } from "react";

export interface HeaderProps {
  maxWidth?: Breakpoint | false;
  title?: string;
  aside?: string;
  onSearchRequested: (query: string) => void;
  onHomeRequested: () => void;
}

export default function Header({
  maxWidth = "lg",
  title = "SEPADU",
  aside = "Jambatan Perkhidmatan Awam",
  onSearchRequested,
  onHomeRequested,
}: HeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <Container maxWidth={maxWidth} sx={{ p: 3 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ButtonBase
          onClick={() => onHomeRequested()}
          sx={{
            p: 0.5,
            borderRadius: 0.5,
          }}
        >
          <Typography>{title}</Typography>
        </ButtonBase>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TextField
            sx={{
              mx: 3,
            }}
            label="Search"
            value={query}
            onChange={(e) => {
              e.preventDefault();
              setQuery(e.target.value);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search></Search>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => onSearchRequested(query)}>
                      <ArrowRight></ArrowRight>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") onSearchRequested(query);
            }}
          ></TextField>
          <Typography>{aside}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
