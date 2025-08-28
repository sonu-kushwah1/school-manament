"use client";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [records, setRecords] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit (add / update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all fields!");
      return;
    }

    if (editIndex !== null) {
      // update record
      const updated = [...records];
      updated[editIndex] = formData;
      setRecords(updated);
      setEditIndex(null);
    } else {
      // add new record
      setRecords((prev) => [...prev, formData]);
    }

    // reset form
    setFormData({ name: "", email: "" });
  };

  // handle edit click
  const handleEdit = (index: number) => {
    setFormData(records[index]);
    setEditIndex(index);
  };

  // handle delete click
  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords((prev) => prev.filter((_, i) => i !== index));
    }
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

        <button type="submit">
          {editIndex !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No records yet
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
