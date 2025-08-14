import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomButton from "@/component/button";
function Error404() {
  return (
    <>
      <Box className="errroBox">
        <Box className="errorContent" sx={{ textAlign: "center" }}>
          <Typography variant="h1" sx={{ fontWeight: "700" }}>
            404
          </Typography>
          <Typography variant="h4">Oops! Page not found</Typography>
          <Typography sx={{ paddingBottom: "20px;" }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <CustomButton label="Go to Home Page"></CustomButton>
        </Box>
      </Box>
    </>
  );
}

export default Error404;
