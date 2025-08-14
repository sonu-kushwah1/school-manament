import React from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import Paper from "@mui/material/Paper";
import CustomButton from "@/component/button";

const Dashboard: React.FC = () => {
  return (
    <div>
      <LayoutWrapper>
        <Typography variant="h6">Notice</Typography>
        <BasicBreadcrumbs currentPage="Notice" />
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Create A Notice</Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <BasicInput label="Title" inputType="text" />
            </Grid>
            <Grid size={6}>
              <BasicInput label="Details" inputType="text" />
            </Grid>
            <Grid size={6}>
              <BasicInput label="Posted By" inputType="text" />
            </Grid>
            <Grid size={6}>
              <BasicInput label="Date" inputType="text" />
            </Grid>
            <Grid size={6}>
              <Stack direction="row" spacing={2}>
                <CustomButton className="mainBtn" label="Save"/>
                <CustomButton className="mainBtn lightBtn" label="Reset"/>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
