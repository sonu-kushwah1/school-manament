"use client"
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [records, setRecords] = useState<any[]>([]);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all fields!");
      return;
    }

    // add new record
    setRecords((prev) => [...prev, formData]);

    // reset form
    setFormData({ name: "", email: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h5>Student Record</h5>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No records yet
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
