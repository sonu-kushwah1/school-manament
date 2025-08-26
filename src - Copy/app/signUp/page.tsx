"use client";
import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useRouter } from "next/navigation";

import InputWithIcon from "@/component/inputWithIcon";
import CustomButton from "@/component/button";
import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const router = useRouter();

  // submit form
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.firstName + " " + formData.lastName,
          phone: formData.phone,
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      console.log("✅ Registered:", data);

      toast.success("User registered successfully!");
       setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Registration failed");
    }
  };

  return (
    <Box className="loginWrapper">
      <Typography variant="h4">Sign Up</Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <InputWithIcon
            icon={<PersonIcon />}
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e: any) => handleChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid size={6}>
          <InputWithIcon
            icon={<PersonIcon />}
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e: any) => handleChange("lastName", e.target.value)}
          />
        </Grid>
      </Grid>

      <InputWithIcon
        icon={<EmailIcon />}
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e: any) => handleChange("email", e.target.value)}
      />

      <InputWithIcon
        icon={<LocalPhoneIcon />}
        type="text"
        placeholder="Phone No"
        value={formData.phone}
        onChange={(e: any) => handleChange("phone", e.target.value)}
      />

      <InputWithIcon
        icon={<RemoveRedEyeIcon />}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e: any) => handleChange("password", e.target.value)}
      />

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CustomButton
          label="Sign Up"
          variant="contained"
          className="loginBtn"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default Signup;
