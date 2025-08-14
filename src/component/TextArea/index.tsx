import * as React from "react";
import { Typography, Box } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

interface CustomTextareaProps {
  placeholder?: string;
  style?: React.CSSProperties;
  minRows?: number;
  label: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  placeholder = "Minimum 3 rows",
  style = { width: "100%" },
  minRows = 3,
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <Box className="textArea">
      <Typography>{label}</Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={minRows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          border: "1px solid #c4c4c4",
          padding: "15px",
          borderRadius: "1px",
          resize: "vertical",
          ...style,
        }}
      />
    </Box>
  );
};

export default CustomTextarea;
