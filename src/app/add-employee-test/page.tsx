"use client";
import React, { useState, useMemo, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Employees = () => {
  const router = useRouter();

  const [Emp, setEmp] = useState({
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
  const [submitting, setSubmitting] = useState(false);

  // designation state
  const [designationOptions, setDesignationOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // fetch designation list
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const res = await axios.get("http://localhost:3001/des_list");
        const opts = res.data.map((item: any) => ({
          label: item.name || item.des || item.title, // 👈 adjust based on API response
          value: item.name || item.des || item.title,
        }));
        setDesignationOptions(opts);
      } catch (err) {
        console.error("Error fetching designations:", err);
      }
    };
    fetchDesignations();
  }, []);

  // input handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEmp((prev) => ({ ...prev, [name]: value }));
  };

  const handleGrossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrossSalary(e.target.value);
  };

  const handlePfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPfPercent(e.target.value);
  };

  // computed values
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

  const netSalary = useMemo(
    () => Math.max(0, numericGross - pfAmount),
    [numericGross, pfAmount]
  );

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...Emp,
      gross_salary: numericGross.toFixed(2),
      pf_percent: numericPF.toFixed(2),
    };

    try {
      setSubmitting(true);
      await axios.post("http://localhost:3001/emp_list_test", payload);
      toast.success("Employee added Sucessfully!");
      router.push("/employees-list-test");
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // reset
  const handleReset = () => {
    setEmp({
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
    setGrossSalary("");
    setPfPercent("");
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading="Add Employee Test"
        currentPage="Add Employees"
      />
      <Box className="customBox">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="First Name"
                inputType="text"
                name="fname"
                value={Emp.fname}
                onChange={handleChange}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Last Name"
                inputType="text"
                name="lname"
                value={Emp.lname}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Gender / DOB / Joining / Emp ID */}
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Gender"
                value={Emp.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Date Of Birth"
                inputType="date"
                name="dob"
                value={Emp.dob}
                onChange={handleChange}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Date Of Joining"
                inputType="date"
                name="joining"
                value={Emp.joining}
                onChange={handleChange}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="EMP ID"
                inputType="text"
                name="emp_id"
                value={Emp.emp_id}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Contact */}
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Email"
                inputType="email"
                name="email"
                value={Emp.email}
                onChange={handleChange}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Phone"
                inputType="text"
                name="phone"
                value={Emp.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setEmp((prev) => ({ ...prev, phone: value }));
                  }
                }}
                inputProps={{ maxLength: 10 }} //
                required
              />
            </Grid>

            {/* Designation from API */}
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Designation"
                value={Emp.des}
                onChange={(val) => handleSelectChange("des", val)}
                options={designationOptions}
                required
              />
            </Grid>

            {/* Salary / PF */}
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Gross Salary"
                inputType="number"
                name="gross_salary"
                value={grossSalary}
                onChange={handleGrossChange}
                required
              />
            </Grid>
              <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="PF %"
                inputType="number"
                name="pf_percent"
                value={pfPercent}
                onChange={handlePfChange}
              />
            </Grid>

            {/* Address */}
            <Grid size={12}>
              <CustomTextarea
                label="Address"
                placeholder="Write here..."
                minRows={3}
                name="address"
                value={Emp.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Computed Salary Breakdown */}
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
