"use client";
import React, { useState, useMemo } from "react";
import LayoutWrapper from "@/component/Layout";
import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";

const Employees = () => {
  const router = useRouter();

  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    emp_id: "",
    email: "",
    phone: "",
    des: "",
    address: "",
  });
  const [grossSalary, setGrossSalary] = useState(""); // user-entered gross
  const [pfPercent, setPfPercent] = useState(""); // PF percentage
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleGrossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrossSalary(e.target.value);
  };

  const handlePfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPfPercent(e.target.value);
  };

  const numericGross = useMemo(() => {
    const n = parseFloat(grossSalary);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [grossSalary]);

  const numericPF = useMemo(() => {
    const n = parseFloat(pfPercent);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [pfPercent]);

  const pfAmount = useMemo(() => {
    if (numericPF === 0 || numericGross === 0) return 0;
    return (numericGross * numericPF) / 100;
  }, [numericGross, numericPF]);

  const netSalary = useMemo(() => Math.max(0, numericGross - pfAmount), [
    numericGross,
    pfAmount,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required validation example
    if (!student.fname.trim() || !student.lname.trim()) {
      alert("First and last name are required.");
      return;
    }

    const payload = {
      ...student,
      gross_salary: numericGross.toFixed(2),
      pf_percent: numericPF.toFixed(2),
      // pf_amount: pfAmount.toFixed(2),
      // net_salary: netSalary.toFixed(2),
    };

    try {
      setSubmitting(true);
      await axios.post("http://localhost:3001/emp_list_test", payload);
      alert("Employee added!");
      router.push("/employees-list-test");
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Submission failed. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStudent({
      fname: "",
      lname: "",
      gender: "",
      dob: "",
      emp_id: "",
      email: "",
      phone: "",
      des: "",
      address: "",
    });
    setGrossSalary("");
    setPfPercent("");
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

    const designationOptions = [
    { label: "Associate Software Engineer", value: "Associate Software Engineer" },
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Senior Software Engineer", value: "Senior Software Engineer" },
  ];

  return (
    <LayoutWrapper>
      <Typography variant="h5">Add Employee Test</Typography>
      <BasicBreadcrumbs currentPage="Add Employees" />

      <Box className="customBox">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name fields */}
            <Grid size={3}>
              <BasicInput
                label="First Name*"
                inputType="text"
                name="fname"
                value={student.fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="Last Name*"
                inputType="text"
                name="lname"
                value={student.lname}
                onChange={handleChange}
              />
            </Grid>

            {/* Gender / DOB / Emp ID */}
            <Grid size={3}>
              <SelectInput
                label="Gender"
                value={student.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="Date Of Birth*"
                inputType="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="EMP ID"
                inputType="text"
                name="emp_id"
                value={student.emp_id}
                onChange={handleChange}
              />
            </Grid>

            {/* Contact / Designation */}
            <Grid size={3}>
              <BasicInput
                label="Email"
                inputType="email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="Phone"
                inputType="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={3}>
              <SelectInput
                label="Designation"
                value={student.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
              />
            </Grid>

            {/* Salary / PF inputs */}
            <Grid size={3}>
              <BasicInput
                label="Gross Salary"
                inputType="number"
                name="gross_salary"
                value={grossSalary}
                onChange={handleGrossChange}
                // helperText="Base salary before PF deduction"
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="PF %"
                inputType="number"
                name="pf_percent"
                value={pfPercent}
                onChange={handlePfChange}
                // helperText="Percentage deducted from gross"
              />
            </Grid>

            {/* Address */}
            <Grid size={12}>
              <CustomTextarea
                label="Address"
                placeholder="Write here..."
                minRows={3}
                name="address"
                value={student.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Computed breakdown */}
            <Grid size={12}>
              <Paper elevation={1} style={{ padding: 12 }}>
                <Typography variant="subtitle2">Computed Breakdown</Typography>
                <Stack direction="row" spacing={4} flexWrap="wrap">
                  <Box>
                    <Typography variant="body2">Gross Salary:</Typography>
                    <Typography fontWeight={600}>
                      {numericGross.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      PF ({numericPF.toFixed(2)} %):
                    </Typography>
                    <Typography fontWeight={600}>
                      {pfAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">Net Salary:</Typography>
                    <Typography fontWeight={600}>
                      {netSalary.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Actions */}
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton
                  type="submit"
                  className="mainBtn"
                  label={submitting ? "Saving..." : "Save"}
                  disabled={submitting}
                />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={handleReset}
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
