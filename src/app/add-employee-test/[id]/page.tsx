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
import { toast } from "react-toastify";

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
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [error, setError] = useState("");

  // ✅ Fetch employee data by id
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
        console.error("Error fetching employee data", err);
        setError("Failed to fetch employee details.");
      }
    };
    fetchData();
  }, [id]);

  // ✅ Fetch designation list from API
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/des_list");
        console.log("Designation API Response:", response.data);

        const list = response.data;

        // Map API fields dynamically
        const formatted = list.map((item: any) => ({
          label: item.name || item.des || item.title || `Des ${item.id}`,
          value: item.name || item.des || item.title || `Des ${item.id}`,
        }));

        setDesignationOptions(formatted);
      } catch (err) {
        console.error("Error fetching designations", err);
      }
    };
    fetchDesignations();
  }, []);

  // ✅ Update employee
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const gross = parseFloat(grossSalary) || 0;
      const pf = parseFloat(pfPercent) || 0;
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
      toast.success("Employee updated successfully!");
      router.push("/employees-list-test");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update employee.");
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

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading="Update Employee"
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
            {/* First Name */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="First Name"
                inputType="text"
                name="fname"
                value={employee.fname}
                onChange={handleChange}
              />
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Last Name"
                inputType="text"
                name="lname"
                value={employee.lname}
                onChange={handleChange}
              />
            </Grid>

            {/* Gender */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Gender"
                value={employee.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
              />
            </Grid>

            {/* DOB */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="DOB"
                inputType="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
              />
            </Grid>

            {/* Joining */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Joining Date"
                inputType="date"
                name="joining"
                value={employee.joining}
                onChange={handleChange}
              />
            </Grid>

            {/* Employee ID */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Employee ID"
                inputType="text"
                name="emp_id"
                value={employee.emp_id}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Email"
                inputType="text"
                name="email"
                value={employee.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Phone */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
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
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            {/* ✅ Designation (from API) */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Designation"
                value={employee.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
              />
            </Grid>

            {/* Salary */}
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Gross Salary"
                inputType="number"
                name="gross_salary"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="PF %"
                inputType="number"
                name="pf_percent"
                value={pfPercent}
                onChange={(e) => setPfPercent(e.target.value)}
                disabled
              />
            </Grid>

            {/* Address */}
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
