import InputWithIcon from "@/component/inputWithIcon";
import { Box, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomButton from "@/component/button";
import Grid from "@mui/material/Grid";
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Login() {
  return (
    <Box className="loginWrapper">
      <Typography variant="h4">Sign In</Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <InputWithIcon
            icon={<PersonIcon />}
            type="text"
            placeholder="First Name"
          />
        </Grid>
        <Grid size={6}>
          <InputWithIcon
            icon={<PersonIcon />}
            type="text"
            placeholder="Last Name"
          />
        </Grid>
      
      </Grid>

      <InputWithIcon
        icon={<EmailIcon />}
        type="email"
        placeholder="Email Address"
      />
      <InputWithIcon icon={<LocalPhoneIcon />} type="text" placeholder="Phone No" />
      <InputWithIcon
        icon={<RemoveRedEyeIcon />}
        type="password"
        placeholder="Password"
      />
      <Box sx={{ textAlign: "center" }}>
        <CustomButton label="Login" variant="contained" className="loginBtn" />
      </Box>
    </Box>
  );
}

export default Login;
