import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import { Box } from "@mui/material";
import React from "react";

const Holiday = () => {
  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Holidays" currentPage="Holidays" />
         <Box className="customBox"></Box>
      </LayoutWrapper>
    </div>
  );
};

export default Holiday;
