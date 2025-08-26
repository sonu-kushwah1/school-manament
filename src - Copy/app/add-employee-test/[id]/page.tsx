"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomTextarea from "@/component/TextArea";
import { Box, Button, Grid, Typography } from "@mui/material";
import LayoutWrapper from "@/component/Layout";
import BasicBreadcrumbs from "@/component/BreadCrumb";

interface UpdateEmployee {
  id?: number;
  emp_id: string;
  fname: string;
  salary: string;
  increment_salary: string;
  gross_salary: string;
  pf_percent: string;
  des: string;
  display_id?: number;
}

const UpdateEmployee = () => {
  const router = useRouter();
  const { id } = useParams(); // get employee id from URL
  const [employee, setemployee] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    joining: "",
    emp_id: "",
    email: "",
    phone: "",
    des: "",
    address: "",
  });

  const [grossSalary, setGrossSalary] = useState("");
  const [pfPercent, setPfPercent] = useState("");
  const [error, setError] = useState("");

  // Fetch employee data
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/emp_list_test/${id}`
        );
        const data = response.data;
        setemployee({
          fname: data.fname || "",
          lname: data.lname || "",
          gender: data.gender || "",
          dob: data.dob || "",
          joining: data.joining || "",
          emp_id: data.emp_id || "",
          email: data.email || "",
          phone: data.phone || "",
          des: data.des || "",
          address: data.address || "",
        });
        setGrossSalary(
          data.gross_salary !== undefined ? String(data.gross_salary) : ""
        );
        setPfPercent(
          data.pf_percent !== undefined ? String(data.pf_percent) : ""
        );
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to fetch employee details.");
      }
    };
    fetchData();
  }, [id]);

  // Update handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const gross = parseFloat(grossSalary);
      const pf = parseFloat(pfPercent);
      const pf_amount = (gross * pf) / 100;
      const net_salary = gross - pf_amount;

      const updatedData = {
        ...employee,
        gross_salary: gross,
        pf_percent: pf,
        pf_amount,
        net_salary,
      };

      await axios.put(`http://localhost:3001/emp_list_test/${id}`, updatedData);
      router.push("/employees-list-test"); // redirect to list page
      console.log("emp data", updatedData);
      alert("Employees Update Successfuly..");
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update employee.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: keyof typeof employee, value: string) => {
    setemployee((prev) => ({ ...prev, [name]: value }));
  };
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const designationOptions = [
    {
      label: "Associate Software Engineer",
      value: "Associate Software Engineer",
    },
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Senior Software Engineer", value: "Senior Software Engineer" },
  ];

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading=" Update Employee"
        currentPage="Update Employee"
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box className="customBox">
          <Grid container spacing={2}>
            <Grid size={4}>
              <BasicInput
                label="First Name"
                inputType="text"
                name="fname"
                value={employee.fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Last Name"
                inputType="text"
                name="lname"
                value={employee.lname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <SelectInput
                label="Gender"
                value={employee.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Dob"
                inputType="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Joining Date"
                inputType="date"
                name="joining"
                value={employee.joining}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Employee Id"
                inputType="text"
                name="emp_id"
                value={employee.emp_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Email"
                inputType="text"
                name="email"
                value={employee.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Phone"
                inputType="text"
                name="phone"
                value={employee.phone}
                 onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setemployee((prev) => ({ ...prev, phone: value }));
                  }
                }}
                inputProps={{ maxLength: 10 }} //
              />
            </Grid>
            <Grid size={4}>
              <SelectInput
                label="Designation"
                value={employee.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
              />
            </Grid>

            <Grid size={4}>
              <BasicInput
                label="Gross Salary"
                inputType="number"
                name="gross_salary"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                disabled
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="PF %"
                name="PF"
                inputType="number"
                value={pfPercent}
                onChange={(e) => setPfPercent(e.target.value)}
                disabled
              />
            </Grid>
            <Grid size={12}>
              <CustomTextarea
                label="Address"
                placeholder="Write here..."
                minRows={3}
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Update Employee
          </Button>
        </Box>
      </form>
    </LayoutWrapper>
  );
};

export default UpdateEmployee;
