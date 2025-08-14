"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "fname", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 90,
  },
  {
    field: "emp_id",
    headerName: "Emp ID",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "email",
    headerName: "Email",
    width: 90,
  },
  {
    field: "address",
    headerName: "Address",
    width: 90,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 90,
  },
   {
    field: "des",
    headerName: "Designation",
    width: 90,
  },
    {
    field: "salary",
    headerName: "Salary",
    width: 90,
  },
];
const Employees = () => {
  const router = useRouter();
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/emp_list");
      console.log("API Data:", response.data); 

      // Add sequential IDs starting from 1 for table display
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        id: index + 1,
      }));

      setStudent(updatedData);
      console.log("this is array data",updatedData);
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
      getAPI();
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };
  return (
    <LayoutWrapper>
      <Typography variant="h5">Employees</Typography>
      <BasicBreadcrumbs currentPage="Employees" />

      <Box className="customBox">
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : !student ? (
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={student}
            checkboxSelection
            
            // onView={(row) => router.push(`/studentDetails/${row.id}`)}
            onEdit={(row) => router.push(`/add-student/${row.id}`)}
            onDelete={(row) => remove(row.id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Employees;
