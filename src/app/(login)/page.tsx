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
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext"; // ✅ import auth

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
  const { login } = useAuth(); // ✅ use login function from context

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // ✅ Call login from context instead of localStorage directly
      login(data.user, data.accessToken);

      setAlertSeverity("success");
      setAlertMessage("Login successful!");
      toast.success("Login Successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setAlertSeverity("error");
      setAlertMessage(err.message || "Login failed");
      toast.error("Please Check User Name or Password.");
    }
  };

  return (
    <Box className="loginWrapper">
      <Typography variant="h4">Login</Typography>

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
