"use client";
import React from "react";
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{
      background: theme.palette.primary.main,
      width:"100%",
      color:"#fff",
      position:"fixed",
      bottom:"0",
      padding:"15px 0",
      textAlign:"center",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      zIndex:"999",
    }}>
      <Typography textAlign="center">
        © Copyrights SNS 2025. All rights reserved. Designed by Sonu Kushwah
      </Typography>
    </Box>
  );
}

export default Footer;
