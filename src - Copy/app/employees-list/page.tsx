"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "emp_id", headerName: "Emp ID", width: 100 },
  { field: "fname", headerName: "First Name", width: 130 },
  { field: "des", headerName: "Designation", width: 120 },
  { field: "salary", headerName: "Salary", width: 100 },
  { field: "pf", headerName: "PF (12%)", width: 100 },
  { field: "insurance", headerName: "Insurance", width: 100 },
  { field: "total_salary", headerName: "Net Salary", width: 120 },
];

const Employees = () => {
  const router = useRouter();
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/emp_list");

      const updatedData = response.data.map((item: any, index: number) => {
        return {
          ...item,
          id: index + 1,
        };
      });

      setStudent(updatedData);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching employee data");
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/emp_list/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete employee", error);
      setError("Failed to delete employee");
    }
  };

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Employees List" currentPage="Employees List" />
      <Box className="customBox">
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
            onEdit={(row) => router.push(`/add-student/${row.id}`)}
            onDelete={(row) => remove(row.id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Employees;
