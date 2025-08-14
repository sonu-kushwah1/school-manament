"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "tableId", headerName: "Id", width: 70 }, // Display ID
  { field: "fname", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
  { field: "gender", headerName: "Gender", width: 90 },
  { field: "class", headerName: "Class", sortable: false, width: 100 },
  { field: "fees", headerName: "Fees", width: 90 },
  { field: "address", headerName: "Address", width: 90 },
  { field: "dob", headerName: "DOB", width: 90 },
  { field: "phone", headerName: "Phone", width: 90 },
];

function Student() {
  const router = useRouter();
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/student_list");

      // Add a display-only tableId
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item, // keeps backend id
        tableId: index + 1, // display id for DataGrid
      }));

      setStudent(updatedData);
    } catch (error) {
      setError("Error fetching student data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const remove = async (backendId: number) => {
    try {
      await axios.delete(`http://localhost:3001/student_list/${backendId}`);
      getAPI();
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
        <DataTable
          columns={columns}
          rows={student}
          checkboxSelection
          onView={(row) => router.push(`/studentDetails/${row.id}`)} // backend id
          onEdit={(row) => router.push(`/add-student/${row.id}`)}    // backend id
          onDelete={(row) => remove(row.id)}                         // backend id
        />
      )}
    </LayoutWrapper>
  );
}

export default Student;
