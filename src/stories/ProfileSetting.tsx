import "./fonts";
import React, { useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  Grid2,
  Container,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { User } from "../models/user";
import InputAdornment from '@mui/material/InputAdornment';
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

  const [IcError, setIcError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validateIc = (ic: string): boolean => {
    const icRegex = /^\d{12}$/;
    return icRegex.test(ic);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNo = (phoneNo: string): boolean => {
    const phoneRegex = /^\d{9,10}$/; 
    return phoneRegex.test(phoneNo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isIcValid = validateIc(ic);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNo(phoneNo);

    setIcError(!isIcValid);
    setEmailError(!isEmailValid);
    setPhoneError(!isPhoneValid);

    if (!isIcValid || !isEmailValid || !isPhoneValid) return; 

    const data = new User(ic, name, phoneNo, email, privilege, avatar);
    onSubmitRequested(data);
  };

  return (
    <StyledPaper square={false}>
      <StyledContainer
        sx={{ borderRadius: 3, padding: 3, boxShadow: 3, maxWidth: 1000 }}
      >
        <Stack>
          <Container sx={{ marginLeft: -3 }}>
            <Typography variant="h6">
              <strong>Please Update Your Profile Details</strong>
            </Typography>
          </Container>
        </Stack>
        <Divider sx={{ borderBottomWidth: 3, borderColor: "gray", my: 1 }} />
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
                setIc(e.currentTarget.value);
              }}
              error={IcError}
              helperText={IcError ? "Invalid IC format" : ""}
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
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><Typography sx={{ color: "black" }}>+60</Typography></InputAdornment>,
                },
              }}
              onChange={(e) => {
                setPhoneNo(e.currentTarget.value);
              }}
              error={phoneError}
              helperText={phoneError ? "Invalid phone number" : ""}
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
                setEmail(e.currentTarget.value);
              }}
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
            />
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </StyledContainer>
    </StyledPaper>
  );
};

export default ProfileSetting;
