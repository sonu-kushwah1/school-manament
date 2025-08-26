"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Box, Typography, Grid, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Employee {
  id?: number;
  emp_id: string;
  fname: string;
  salary: string; // base salary
  salary_increment: string; // percent
  pf_increment: string; // percent
  insurance_increment: string; // percent
  des: string;
  display_id?: number;
}

const Employees = () => {
  const router = useRouter();

  const emptyEmployee: Employee = {
    emp_id: "",
    fname: "",
    salary: "",
    salary_increment: "",
    pf_increment: "",
    insurance_increment: "",
    des: "",
  };

  const [employee, setEmployee] = useState<Employee>({ ...emptyEmployee });
  const [empList, setEmpList] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const safeNumber = (s: string) => {
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };

  const baseSalary = safeNumber(employee.salary);
  const salaryIncrementPct = safeNumber(employee.salary_increment);
  const pfIncrementPct = safeNumber(employee.pf_increment);
  // const insuranceIncrementPct = safeNumber(employee.insurance_increment);

  const salaryIncrementAmount = (baseSalary * salaryIncrementPct) / 100;
  const pfIncrementAmount = (baseSalary * pfIncrementPct) / 100;
  // const insuranceIncrementAmount = (baseSalary * insuranceIncrementPct) / 100;

  const totalSalary = baseSalary + salaryIncrementAmount;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/emp_list");
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        display_id: index + 1,
      }));
      setEmpList(updatedData);
    } catch (err) {
      setError("Error fetching employee data");
      console.error(err);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleEmployeeSelect = (val: string) => {
    const selected = empList.find((e) => e.fname === val || e.emp_id === val);
    if (selected) {
      setEmployee({
        emp_id: selected.emp_id,
        fname: selected.fname,
        salary: selected.salary,
        salary_increment: selected.salary_increment,
        pf_increment: selected.pf_increment,
        insurance_increment: selected.insurance_increment,
        des: selected.des,
      });
      setIsEditMode(true);
      setEditId(selected.id ?? null);
    } else {
      setEmployee({ ...emptyEmployee, fname: val });
      setIsEditMode(false);
      setEditId(null);
    }
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!employee.emp_id.trim() || !employee.fname.trim()) {
      setError("EMP ID and Employee Name are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...employee,
        computed: {
          salary_increment_amount: salaryIncrementAmount.toFixed(2),
          total_salary: totalSalary.toFixed(2),
          pf_increment_amount: pfIncrementAmount.toFixed(2),
          // insurance_increment_amount: insuranceIncrementAmount.toFixed(2),
        },
      };
      if (isEditMode && editId !== null) {
        await axios.put(`http://localhost:3001/emp_list/${editId}`, payload);
        alert("Employee updated!");
      } else {
        await axios.post("http://localhost:3001/emp_list", payload);
        alert("Employee added!");
      }
      await getAPI();
      router.push("/employees");
    } catch (err) {
      console.error("Error submitting form", err);
      setError("Failed to submit form.");
    } finally {
      setSubmitting(false);
    }
  };

  const designationOptions = [
    { label: "Associate Software Engineer", value: "Associate Software Engineer" },
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Senior Software Engineer", value: "Senior Software Engineer" },
  ];

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Employees Salary Managment" currentPage="Employees Salary Management" />
      <Box className="customBox" sx={{ mt: 2 }}>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Select existing employee */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Select Employee"
                value={employee.fname}
                onChange={(val) => handleEmployeeSelect(val)}
                options={empList.map((e) => ({ label: e.fname, value: e.fname }))}
              />
            </Grid>

            {/* EMP ID */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="EMP ID"
                inputType="text"
                name="emp_id"
                value={employee.emp_id}
                onChange={handleChange}
              />
            </Grid>

            {/* Employee Name */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Employee Name"
                inputType="text"
                name="fname"
                value={employee.fname}
                onChange={handleChange}
              />
            </Grid>

            {/* Base Salary */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Salary (Base)"
                inputType="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
              />
            </Grid>

            {/* Salary Increment % */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Salary Increment (%)"
                inputType="number"
                name="salary_increment"
                value={employee.salary_increment}
                onChange={handleChange}
              />
            </Grid>

            {/* Salary computed summary */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Increment Amt: {salaryIncrementAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Total Salary: {totalSalary.toFixed(2)}
              </Typography>
            </Grid>

            {/* PF % */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Provident Fund (%)"
                inputType="number"
                name="pf_increment"
                value={employee.pf_increment}
                onChange={handleChange}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                PF Amount: {pfIncrementAmount.toFixed(2)}
              </Typography>
            </Grid>

            {/* Insurance % */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Insurance"
                inputType="text"
                name="insurance_increment"
                value={employee.insurance_increment}
                onChange={handleChange}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {/* Insurance Amount: {insuranceIncrementAmount.toFixed(2)} */}
              </Typography>
            </Grid>

            {/* Designation */}
             <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Designation"
                value={employee.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
              />
            </Grid>

            {/* Buttons */}
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton
                  type="submit"
                  className="mainBtn"
                  label={isEditMode ? "Update" : "Save"}
                  disabled={submitting}
                />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={() => {
                    setEmployee({ ...emptyEmployee });
                    setIsEditMode(false);
                    setEditId(null);
                    setError("");
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LayoutWrapper>
  );
};

export default Employees;
