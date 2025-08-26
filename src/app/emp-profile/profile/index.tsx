"use client";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";

type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  designation?: string;
  avatar?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ✅ Always fetch fresh user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetch(`http://localhost:5000/users/${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // refresh local copy
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      avatar: previewImage || user.avatar,
    };

    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // ✅ update localStorage
        setIsEditing(false);
        setPreviewImage(null);
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ clear on logout
    window.location.href = "/"; // redirect to login
  };

  if (!user) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          height: 100,
          backgroundImage: "url('/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Avatar */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          mt: -6,
          mb: 1,
        }}
      >
        <Avatar
          src={previewImage || user.avatar || "/default-avatar.png"}
          sx={{ width: 96, height: 96, border: "3px solid white" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: "calc(50% - 48px)",
            bgcolor: "white",
            boxShadow: 1,
          }}
          size="small"
          component="label"
        >
          <EditIcon fontSize="small" />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </IconButton>
      </Box>

      {/* Name, role, ID */}
      <Box textAlign="center">
        {isEditing ? (
          <TextField
            size="small"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        ) : (
          <Typography variant="h6" fontWeight="bold">
            {user.username}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {user.designation || "Employee"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {user.id}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Basic Info */}
      <Box px={2} pb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Basic Information
        </Typography>
        <Stack spacing={1.2} mt={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon />
            {isEditing ? (
              <TextField
                size="small"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            ) : (
              <Typography variant="body2">{user.email}</Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon />
            {isEditing ? (
              <TextField
                size="small"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            ) : (
              <Typography variant="body2">{user.phone}</Typography>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Action Buttons */}
      <Box textAlign="center" pb={2}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
        <Button
          variant="text"
          color="error"
          sx={{ ml: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;
