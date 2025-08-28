"use client";

import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import CustomButton from "../button";

interface BasicBreadcrumbsProps {
  currentPage: string;
  heading: string; // New prop for heading text
}

const handleClick = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
};

const BasicBreadcrumbs: React.FC<BasicBreadcrumbsProps> = ({
  currentPage,
  heading,
}) => {
  return (
    <Box className="custom-breadcrumb">
      <Typography
        variant="h5"
        sx={{ mb: 1, color: "#1c1b54", fontWeight: "600" }}
      >
        {heading}
      </Typography>
     <Grid container alignItems="center">
        <Grid size={10}>
          <Box role="presentation" onClick={handleClick} sx={{ mb: 3 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="rgb(3 35 93 / 60%)" href="/">
                Home
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                {currentPage}
              </Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
        <Grid size={2}>
          <CustomButton type="button" label="Back" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicBreadcrumbs;
