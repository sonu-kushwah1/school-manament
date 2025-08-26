"use client";

import React from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Paper, Button, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import { toast } from "react-toastify";

const Leave: React.FC = () => {
  const successToster = () => toast.success("✅ Success message!");
  const errorToster = () => toast.error("❌ Error message!");
  const warningToster = () => toast.warn("⚠️ Warning message!");
  const infoToster = () => toast.info("ℹ️ Info message!");
  const defaultToster = () => toast("📢 Default message!");

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Test Deafult Page" currentPage="Leave" />
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Test Deafult Page
        </Typography>

        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success" onClick={successToster}>
            Success
          </Button>
          <Button variant="contained" color="error" onClick={errorToster}>
            Error
          </Button>
          <Button variant="contained" color="warning" onClick={warningToster}>
            Warning
          </Button>
          <Button variant="contained" color="info" onClick={infoToster}>
            Info
          </Button>
          <Button variant="contained" onClick={defaultToster}>
            Default
          </Button>
        </Stack>
      </Paper>
    </LayoutWrapper>
  );
};

export default Leave;
