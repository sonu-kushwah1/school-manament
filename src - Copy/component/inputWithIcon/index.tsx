import React from "react";
import { Box } from "@mui/material";
import styled from "./styled.module.css";

type InputWithIconProps = {
  icon: React.ReactNode;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  type,
  value,
  placeholder,
  onChange,
  onIconClick,
}) => {
  return (
    <Box className={styled.InputIcon}>
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
      />
    </Box>
  );
};

export default InputWithIcon;
