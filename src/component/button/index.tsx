import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

// Extend MUI's ButtonProps so your custom button accepts everything a MUI button does
interface CustomButtonProps extends ButtonProps {
  label?: string; // Optional custom label if user wants to provide one
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label = "Click Me",
  ...rest // All other props (variant, color, className, etc.)
}) => {
  return (
    <Button {...rest} sx={{
      backgroundColor:"#094270",
      color:"#fff",
      padding: "8px 15px",
      borderRadius: "5px",
    }}>
      {label}
    </Button>
  );
};

export default CustomButton;
