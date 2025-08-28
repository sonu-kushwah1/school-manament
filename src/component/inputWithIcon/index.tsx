import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import styled from "./styled.module.css";

type InputWithIconProps = {
  icon: React.ReactNode;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>; // ✅ Added
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  type,
  value,
  placeholder,
  onChange,
  onIconClick,
  onKeyDown,
  sx, // ✅ Added
}) => {
  return (
    <Box className={styled.InputIcon} sx={sx}>
      <span
        onClick={onIconClick}
        className={styled.iconWrapper}
        style={{ cursor: onIconClick ? "pointer" : "default" }}
      >
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Box>
  );
};

export default InputWithIcon;
