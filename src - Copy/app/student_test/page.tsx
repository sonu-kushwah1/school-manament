"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import Image from "next/image";

function Student() {
  const router = useRouter();
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/student_list");
      setStudent(response.data); // ✅ DO NOT override the real id
    } catch (error) {
      setError("Error fetching student data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/student_list/${id}`);
      getAPI(); // refresh list
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Student
      </Typography>
      <BasicBreadcrumbs currentPage="Student" />

      {error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : student.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      ) : (
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Profile</th>
                <th>Name</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image || "https://via.placeholder.com/40"}
                      alt={item.fname}
                      width={40}
                      height={40}
                      className="profile-img"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{item.fname} {item.lname}</td>
                  <td>
                    <button
                      onClick={() => router.push(`/studentDetails/${item.id}`)}
                      className="btn btn-read"
                    >
                      Read
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => router.push(`/add-student/${item.id}`)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => remove(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </LayoutWrapper>
  );
}

export default Student;
