"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/student_list")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Student List" currentPage="Student" />

      <Box className="customBox" sx={{ marginTop: "20px" }}>
        <div className="custom-table-container attendance">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Id</th> {/* 👈 This will now show 1, 2, 3, ... */}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Fees</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Phone</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: any, index: number) => (
                <tr key={index}>
                  {/* 👇 Display counter instead of API ID */}
                  <td>{index + 1}</td>
                  <td>{student.fname}</td>
                  <td>{student.lname}</td>
                  <td>{student.gender}</td>
                  <td>{student.class}</td>
                  <td>{student.fees}</td>
                  <td>{student.address}</td>
                  <td>{student.dob}</td>
                  <td>{student.phone}</td>
                  <button>Delete</button>
                  <button>Edit</button>
                  <button>View</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </LayoutWrapper>
  );
}

export default Student;
