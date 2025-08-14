import React from "react";
import styled from "./styled.module.css";

interface InputData {
  label?: string;
  inputType: string;
  placeholder?: string;
  name: string;
  value: string | number; // ✅ string और number दोनों allow
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInput({
  inputType,
  label,
  placeholder,
  name,
  value,
  onChange
}: InputData) {
  return (
    <div className={styled.basicInput}>
      {label && (
        <label htmlFor={name} style={{ display: "block" }}>
          {label}
        </label>
      )}
      <input
        type={inputType}
        id={name}
        autoComplete="off"
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "1px solid #c4c4c4",
          padding: "15px 15px",
          outline: "none",
          transition: "border-width 0.3s ease",
        }}
      />
    </div>
  );
}
