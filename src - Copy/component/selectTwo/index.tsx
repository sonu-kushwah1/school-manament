"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

type SelectInputProps = {
  label: string;
  value: string;
  options: { label: string; value: string | number }[];
  onChange: (value: string) => void;
  required?: boolean;   // 🔥 added
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
  required = false,   // 🔥 default false
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className="selectTwo">
      <FormControl fullWidth required={required}> {/* 🔥 MUI built-in */}
        <Typography>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          required={required} // 🔥 HTML5 validation
          sx={{
            height: 50,
            borderRadius: "1px",
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c4c4c4",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
          }}
        >
          <MenuItem value="">
            <em>Select {label}</em>
          </MenuItem>
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
