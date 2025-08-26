"use client";
import React, { useState } from "react";
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
    salary: "",
    address: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/emp_list", student);
      alert("Student added!");
      router.push("/employees");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];



  return (
    <LayoutWrapper>
    
      <BasicBreadcrumbs heading="Add Employees" currentPage="Add Employees" />

      <Box className="customBox">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
              <BasicInput
                label="Designation"
                inputType="text"
                name="des"
                value={student.des}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="Salary"
                inputType="text"
                name="salary"
                value={student.salary}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid size={12}>
              <div>
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </Grid> */}
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
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton type="submit" className="mainBtn" label="Save" />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={() =>
                    setStudent({
                      fname: "",
                      lname: "",
                      gender: "",
                      dob: "",
                      emp_id: "",
                      email: "",
                      phone: "",
                      des: "",
                      salary: "",
                      address: "",
                    })
                  }
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
