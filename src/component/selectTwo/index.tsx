// components/SelectInput.tsx
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import styled from "./styled.module.css";

type SelectInputProps = {
  label: string;
  value: string;
  options: { label: string; value: string | number }[];
  onChange: (value: string) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="selectTwo">
      <FormControl fullWidth>
        <Typography>{label}</Typography>
        <Select
          value={value}
          onChange={handleChange}
          sx={{
            height: 50, // custom height
            borderRadius: "1px", // rounded corners
            backgroundColor: "#fff", // light background
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c4c4c4", // custom border
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888", // border on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2", // border on focus
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
