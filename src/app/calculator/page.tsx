"use client";
import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  // handle button click
  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  // clear input
  const handleClear = () => {
    setInput("");
  };

  // delete last character
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // evaluate expression
  const handleCalculate = () => {
    try {
      // ⚠️ eval used for demo purpose only
      setInput(String(eval(input)));
    } catch {
      alert("Invalid Expression");
    }
  };

  return (
    <div
      style={{
        maxWidth: "250px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>Calculator</h3>

      <input
        type="text"
        value={input}
        readOnly
        style={{
          width: "100%",
          height: "40px",
          marginBottom: "10px",
          textAlign: "right",
          paddingRight: "10px",
          fontSize: "18px",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
        {/* Row 1 */}
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>←</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button onClick={() => handleClick("/")}>/</button>

        {/* Row 2 */}
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>×</button>

        {/* Row 3 */}
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        {/* Row 4 */}
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        {/* Row 5 */}
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick("00")}>00</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
