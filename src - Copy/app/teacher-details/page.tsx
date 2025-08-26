import React from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";

const Dashboard: React.FC = () => {
  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Teacher Details" currentPage="Teacher" />
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
