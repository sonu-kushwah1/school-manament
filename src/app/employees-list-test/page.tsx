"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";
import CustomButton from "@/component/button";
import SelectInput from "@/component/selectTwo";

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
  const [allEmployees, setAllEmployees] = useState<any[]>([]); // keep full list
  const [error, setError] = useState("");

  // designation filter
  const [selectedDes, setSelectedDes] = useState("");
  const [desOptions, setDesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // fetch employees
  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/emp_list_test");

      const updatedData = response.data.map((item: any, index: number) => {
        const gross = parseFloat(item.gross_salary) || 0;
        const pfPercent = parseFloat(item.pf_percent) || 0;

        const pfAmount = (gross * pfPercent) / 100;
        const netSalary = gross - pfAmount;

        return {
          ...item,
          id: index + 1,
          pf_amount: pfAmount.toFixed(2),
          net_salary: netSalary.toFixed(2),
          original_id: item.id,
        };
      });

      setEmployees(updatedData);
      setAllEmployees(updatedData); // keep backup copy
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching employee data");
    }
  };

  // fetch designations
  const getDesList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/des_list");
      const options = response.data.map((item: any) => ({
        label: item.name || item.des || item.title, // adjust field name
        value: item.name || item.des || item.title,
      }));
      setDesOptions(options);
    } catch (error) {
      console.error("Error fetching designation list", error);
    }
  };

  useEffect(() => {
    getAPI();
    getDesList();
  }, []);

  // delete employee
  const remove = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3001/emp_list_test/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete employee", error);
      setError("Failed to delete employee");
    }
  };

  // filter employees based on designation
  useEffect(() => {
    if (selectedDes) {
      setEmployees(allEmployees.filter((emp) => emp.des === selectedDes));
    } else {
      setEmployees(allEmployees);
    }
  }, [selectedDes, allEmployees]);

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading="Employees List Test"
        currentPage="Employees List"
      />
      <form>
        <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
            <SelectInput
              label="Designation"
              value={selectedDes}
              onChange={(val) => setSelectedDes(val)}
              options={desOptions}
            />
          </Grid>

           <Grid size={{ xs: 3, md: 4, lg:1 }}>
            <CustomButton
              label="Reset"
              onClick={() => {
                setSelectedDes("");
                setEmployees(allEmployees); // reset filter
              }}
            />
          </Grid>

            <Grid size={{ xs: 6, md: 4, lg:1 }}>
            <CustomButton
              label="Add Employees"
              onClick={() => {
                router.push("/add-employee-test");
              }}
            />
          </Grid>
        </Grid>
      </form>

      <Box className="customBox" sx={{marginTop:"15px"}}>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : employees.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No employees found</Typography>
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
