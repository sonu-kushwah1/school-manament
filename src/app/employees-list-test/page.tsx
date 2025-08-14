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
  { field: "des", headerName: "Designation", width: 150 },
  { field: "gross_salary", headerName: "Gross Salary", width: 120 },
  { field: "pf_percent", headerName: "PF %", width: 100 },
  {
    field: "pf_amount",
    headerName: "PF Amount",
    width: 120,
  },
  {
    field: "net_salary",
    headerName: "Net Salary",
    width: 120,
  },
];

const Employees = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState<any[]>([]);
  const [error, setError] = useState("");

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/emp_list_test");

      // ✅ Calculate PF amount & Net salary dynamically
      // Inside getAPI
      const updatedData = response.data.map((item: any, index: number) => {
        const gross = parseFloat(item.gross_salary) || 0;
        const pfPercent = parseFloat(item.pf_percent) || 0;

        const pfAmount = (gross * pfPercent) / 100;
        const netSalary = gross - pfAmount;

        return {
          ...item,
          id: index + 1, // 👈 Display index (1-based numbering)
          pf_amount: pfAmount.toFixed(2),
          net_salary: netSalary.toFixed(2),
          original_id: item.id, // 👈 Keep original DB ID for edit/delete
        };
      });

      setEmployees(updatedData);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching employee data");
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const remove = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/emp_list_test/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete employee", error);
      setError("Failed to delete employee");
    }
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5">Employees List Test</Typography>
      <BasicBreadcrumbs currentPage="Employees List" />
      <Box className="customBox">
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : employees.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={employees}
            checkboxSelection
            onEdit={(row) =>
              router.push(`/add-employee-test/${row.original_id}`)
            }
            onDelete={(row) => remove(row.original_id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Employees;
