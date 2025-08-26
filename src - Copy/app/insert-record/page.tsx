"use client"
import React, { useState } from "react";
import { Container } from "@mui/material";
import axios from "axios";

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    des: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: formData.title,
        body: formData.des,
        userId: 1
      });

      console.log("Inserted Record:", response.data);
      alert("Record inserted successfully!");
    } catch (error) {
      console.error("Error inserting record:", error);
      alert("Failed to insert record.");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Your Title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="des"
          rows={4}
          cols={50}
          className="form-control"
          placeholder="Enter description"
          value={formData.des}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default StudentForm;
