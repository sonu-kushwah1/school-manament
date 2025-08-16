import React from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";

const Dashboard: React.FC = () => {
  return (
    <div>
      <LayoutWrapper>
      
        <BasicBreadcrumbs heading="Setting" currentPage="Setting" />
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
