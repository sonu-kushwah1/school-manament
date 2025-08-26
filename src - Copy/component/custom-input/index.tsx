import React from "react";
import { Box, Typography } from "@mui/material";

interface InputData {
  label?: string;
  inputType: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // ✅ new
}

export default function BasicInput({
  inputType,
  label,
  placeholder,
  name,
  value,
  onChange,
  disabled = false,
  required = false,
  inputProps, // ✅ new
}: InputData) {
  return (
    <div>
      {label && (
        <Typography
          component="label"
          htmlFor={name}
          sx={{ display: "block", fontWeight: 500, paddingBottom: "2px" }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </Typography>
      )}

      <Box
        component="input"
        type={inputType}
        id={name}
        name={name}
        autoComplete="off"
        onChange={onChange}
        {...(inputType !== "file" ? { value } : {})}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...inputProps} // ✅ spread extra props here
        sx={{
          width: "100%",
          border: "1px solid #c4c4c4",
          p: "15px",
          outline: "none",
          transition: "border-color 0.3s ease",
          bgcolor: disabled ? "#f5f5f5" : "white",
          cursor: disabled ? "not-allowed" : "text",
          "&:focus": {
            borderColor: "#1c1b54",
          },
        }}
      />
    </div>
  );
}
