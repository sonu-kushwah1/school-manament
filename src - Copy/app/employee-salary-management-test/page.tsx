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
import { toast } from "react-toastify";

interface Employee {
  id?: number;
  emp_id: string;
  fname: string;
  salary: string;
  increment_salary: string;
  gross_salary: string;
  pf_percent: string;
  des: string;
  display_id?: number; // frontend only
}

const Employees = () => {
  const router = useRouter();

  const emptyEmployee: Employee = {
    emp_id: "",
    fname: "",
    salary: "",
    increment_salary: "",
    gross_salary: "",
    pf_percent: "",
    des: "",
  };

  const [employee, setEmployee] = useState<Employee>({ ...emptyEmployee });
  const [empList, setEmpList] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [originalGross, setOriginalGross] = useState<number>(0);

  const toNumber = (v: string | undefined) => {
    const n = parseFloat(v || "");
    return isNaN(n) ? 0 : n;
  };

  // Derived calculations
  const incrementAmount = toNumber(employee.increment_salary);
  const grossSalaryCalc = originalGross + incrementAmount;
  const pfPct = toNumber(employee.pf_percent);
  const pfAmount = (grossSalaryCalc * pfPct) / 100;
  const netSalary = Math.max(0, grossSalaryCalc - pfAmount);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const fetchEmployees = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/emp_list_test");
      const withDisplay = resp.data.map((item: any, idx: number) => ({
        ...item,
        display_id: idx + 1, // only for frontend
      }));
      setEmpList(withDisplay);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (val: string) => {
    const sel = empList.find((e) => e.fname === val || e.emp_id === val);
    if (sel) {
      const grossNum = parseFloat(sel.gross_salary) || 0;
      setOriginalGross(grossNum);
      setEmployee({
        emp_id: sel.emp_id,
        fname: sel.fname,
        salary: "",
        increment_salary: "",
        gross_salary: sel.gross_salary,
        pf_percent: sel.pf_percent,
        des: sel.des,
      });
      setIsEditMode(true);
      setEditId(sel.id ?? null);
    } else {
      setOriginalGross(0);
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
      const updatedGross = grossSalaryCalc.toFixed(2);

      if (isEditMode && editId !== null) {
        const existing = empList.find((e) => e.id === editId);
        if (!existing) throw new Error("Employee not found");

        // Merge old data, only replace gross_salary & pf_percent
        const { display_id, ...updatedEmployee } = {
          ...existing,
          gross_salary: updatedGross,
          pf_percent: employee.pf_percent,
        };

        await axios.put(
          `http://localhost:3001/emp_list_test/${editId}`,
          updatedEmployee
        );
        toast.success("Salary updated Successfully!");
      } else {
        const { display_id, ...newEmployee } = {
          ...employee,
          gross_salary: updatedGross,
        };

        await axios.post("http://localhost:3001/emp_list_test", newEmployee);
        alert("Employee added!");
      }

      await fetchEmployees();
      router.push("/employees-list-test");
    } catch (err) {
      console.error(err);
      setError("Submission failed.");
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
      <BasicBreadcrumbs heading="Employees Salary Management Test" currentPage="Employees Salary Management" />
      <Box className="customBox" sx={{ mt: 2 }}>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Select existing employee */}
            <Grid size={3}>
              <SelectInput
                label="Select Employee"
                value={employee.fname}
                onChange={(val) => handleEmployeeSelect(val)}
                options={empList.map((e) => ({
                  label: e.fname || e.emp_id,
                  value: e.fname || e.emp_id,
                }))}
              />
            </Grid>

            {/* EMP ID */}
            <Grid size={3}>
              <BasicInput
                label="EMP ID"
                inputType="text"
                name="emp_id"
                value={employee.emp_id}
                onChange={handleChange}
                disabled
              />
            </Grid>

            {/* Employee Name */}
            <Grid size={3}>
              <BasicInput
                label="Employee Name"
                inputType="text"
                name="fname"
                value={employee.fname}
                onChange={handleChange}
                disabled
              />
            </Grid>

            {/* Increment Amount */}
            <Grid size={3}>
              <BasicInput
                label="Increment Amount"
                inputType="number"
                name="increment_salary"
                value={employee.increment_salary}
                onChange={handleChange}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Original Gross Salary: {originalGross.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                New Gross Salary: {grossSalaryCalc.toFixed(2)}
              </Typography>
            </Grid>

            {/* PF % */}
            <Grid size={3}>
              <BasicInput
                label="Provident Fund (%)"
                inputType="number"
                name="pf_percent"
                value={employee.pf_percent}
                onChange={handleChange}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                PF Amount: {pfAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Net Salary: {netSalary.toFixed(2)}
              </Typography>
            </Grid>

            {/* Designation */}
            <Grid size={3}>
              <SelectInput
                label="Designation"
                value={employee.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
              />
            </Grid>

            {/* Actions */}
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
                    setOriginalGross(0);
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
