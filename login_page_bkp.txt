"use client"; 

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputWithIcon from "@/component/inputWithIcon";
import CustomButton from "@/component/button";
import SimpleAlert from "@/component/alert"; 
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

const users: User[] = [
  { email: "admin", password: "12345" },
  { email: "admin@example.com", password: "adminpass" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "error" | "warning" | "info" | "success" | null
  >(null);

  const router = useRouter();

  const handleLogin = () => {
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      setAlertMessage("Login successful!");
      setAlertSeverity("success");

      setTimeout(() => {
        router.push("/dashboard");
      }); // Delay to show alert
    } else {
      setAlertMessage("Invalid credentials");
      setAlertSeverity("error");
    }
  };

  return (
    <Box className="loginWrapper">
      <Typography variant="h4">Login</Typography>

      {/* ✅ Conditional alert rendering */}
      {alertSeverity && (
        <Box my={2}>
          <SimpleAlert
            message={alertMessage}
            severity={alertSeverity}
            showIcon={true}
          />
        </Box>
      )}

      <InputWithIcon
        icon={<EmailIcon />}
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputWithIcon
        icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      <Box sx={{ textAlign: "center" }}>
        <CustomButton
          label="Login"
          variant="contained"
          className="loginBtn"
          onClick={handleLogin}
        />
      </Box>
    </Box>
  );
}

export default Login;
