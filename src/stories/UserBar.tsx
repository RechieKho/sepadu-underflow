import {
  Breakpoint,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import "./fonts";
import { Add } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { User } from "../models/user";

export interface CounterProps {
  maxWidth?: Breakpoint;
  user: User;
  onAddRequested: () => void;
}

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(2),
}));

const Username = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginLeft: theme.spacing(1),
}));

const AdminChip = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export default function UserBar({
  maxWidth = "lg",
  user,
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
          <UserInfo>
            <Avatar src={user.avatar} alt={user.name} />
            <Username variant="body1">{user.name}</Username>
            {user.privilege === "admin" && (
              <AdminChip label="Admin" size="small" />
            )}
          </UserInfo>
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
