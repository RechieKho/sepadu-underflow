import "./fonts";
import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Paper,
  Divider,
  Grid2,
  Container,
  Stack,
  TextField,
  Fab,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { User } from "../models/user";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface ProfileSettingProps {
  user: User;
  onSubmitRequested: (data: User) => void;
  onDeleteRequested: (data: User) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
}));

const ProfileSetting: React.FC<ProfileSettingProps> = ({
  user,
  onDeleteRequested,
  onSubmitRequested,
}) => {
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [ic, setIc] = useState(user.ic);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [email, setEmail] = useState(user.email);
  const [privilege, setPrivilege] = useState(user.privilege);

  return (
    <StyledPaper square={false}>
      <StyledContainer
        sx={{ borderRadius: 3, padding: 3, boxShadow: 3, maxWidth: 1000 }}
      >
        <Stack>
          <Container sx={{ marginLeft: -3 }}>
            <Typography variant="h6">
              <strong>Profile Details</strong>
            </Typography>
          </Container>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, borderColor: "gray", my: 1 }} />
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>Avatar:</strong>
              </Typography>
            </Grid2>
            {/* TODO: set avatar. */}
            <Avatar
              alt={name}
              src={avatar}
              sx={{
                width: { xs: 170, sm: 90, md: 170 },
                height: { xs: 170, sm: 90, md: 170 },
                borderRadius: 2,
              }}
              variant="rounded"
            />
            <Fab sx={{ marginLeft: -6 }} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid2>
        </Stack>
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>Name:</strong>
              </Typography>
            </Grid2>
            <TextField
              required
              id="outlined-required"
              label="Required"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.currentTarget.value);
              }}
            />
          </Grid2>
        </Stack>
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>IC No.: </strong>
              </Typography>
            </Grid2>
            <TextField
              required
              id="outlined-required"
              label="Required"
              value={ic}
              onChange={(e) => {
                e.preventDefault();
                setIc(e.currentTarget.value);
              }}
            />
          </Grid2>
        </Stack>
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>Phone No.: </strong>
              </Typography>
            </Grid2>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={phoneNo}
              onChange={(e) => {
                e.preventDefault();
                setPhoneNo(e.currentTarget.value);
              }}
            />
          </Grid2>
        </Stack>
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>Email: </strong>
              </Typography>
            </Grid2>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.currentTarget.value);
              }}
            />
          </Grid2>
        </Stack>
        <Stack sx={{ my: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body1">
                <strong>Privilege: </strong>
              </Typography>
            </Grid2>
            <Select
              value={privilege}
              onChange={(e) => {
                e.preventDefault();
                const value = e.target.value;
                if (value !== "community" && value !== "admin") return;
                setPrivilege(value);
              }}
            >
              <MenuItem value="community">Community</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </Grid2>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, borderColor: "gray", my: 1 }} />
        <Stack
          sx={{ justifyContent: "flex-end", my: 3 }}
          direction="row"
          spacing={2}
        >
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.preventDefault();
              const data = new User(
                ic,
                name,
                phoneNo,
                email,
                privilege,
                avatar
              );
              onDeleteRequested(data);
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={(e) => {
              e.preventDefault();
              const data = new User(
                ic,
                name,
                phoneNo,
                email,
                privilege,
                avatar
              );
              onSubmitRequested(data);
            }}
          >
            Submit
          </Button>
        </Stack>
      </StyledContainer>
    </StyledPaper>
  );
};

export default ProfileSetting;
