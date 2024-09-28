import "./fonts";
import React from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { User } from "../models/user";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

interface ProfileSettingProps {
  user: User;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledTypographyHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingBottom: theme.spacing(0.2),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
}));

const ProfileSetting: React.FC<ProfileSettingProps> = ({ user }) => {
  return (
    <StyledPaper square={false}>
      <StyledContainer
        sx={{
          borderRadius: 3,
          padding: 3,
          boxShadow: 3,
          maxWidth: 1000,
          marginBottom: 4,
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          {/* Avatar and name */}
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{
                width: { xs: 170, sm: 90, md: 170 },
                height: { xs: 170, sm: 90, md: 170 },
                borderRadius: 2,
              }}
              variant="rounded"
            />
          </Grid2>

          {/* Name and location */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <StyledTypographyHeader
              variant="h5"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              {user.name}
            </StyledTypographyHeader>
            <StyledTypographyHeader variant="subtitle1">
              <strong>IC Number: </strong> {user.ic}
            </StyledTypographyHeader>
            <StyledTypographyHeader variant="subtitle2">
              <strong>Phone Number: </strong>
              {user.phoneNo}
            </StyledTypographyHeader>
            <StyledTypographyHeader variant="subtitle2">
              <strong>Email: </strong>
              {user.email}
            </StyledTypographyHeader>
          </Grid2>
        </Grid2>
      </StyledContainer>

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
            <Avatar
              alt={user.name}
              src={user.avatar}
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
              defaultValue={user.name}
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
              defaultValue={user.ic}
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
              defaultValue={user.phoneNo}
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
              defaultValue={user.email}
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
            <TextField
              id="outlined-basic"
              variant="outlined"
              defaultValue={user.privilege}
            />
          </Grid2>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, borderColor: "gray", my: 1 }} />
        <Stack
          sx={{ justifyContent: "flex-end", my: 3 }}
          direction="row"
          spacing={2}
        >
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Submit
          </Button>
        </Stack>
      </StyledContainer>
    </StyledPaper>
  );
};

export default ProfileSetting;
