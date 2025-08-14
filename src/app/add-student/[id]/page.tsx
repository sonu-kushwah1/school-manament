"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [feesList, setFeesList] = useState<any[]>([]); // fees_list from API
  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    gender: "",
    dob: "",
    roll_no: "",
    blood_group: "",
    religion: "",
    email: "",
    class: "",
    fees: "",
    admission_id: "",
    phone: "",
    address: "",
    image: "",
  });

  // ⬇ Handle basic inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // ⬇ Handle select dropdowns
  const handleSelectChange = (name: string, value: string) => {
    if (name === "class") {
      const matched = feesList.find((item) => item.class === value);
      setStudent((prev) => ({
        ...prev,
        class: value,
        fees: matched ? matched.fees : "",
      }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ⬇ Fetch class-fees list
  useEffect(() => {
    axios
      .get("http://localhost:3001/fees_list")
      .then((res) => setFeesList(res.data))
      .catch((err) => console.error("Error fetching fees list:", err));
  }, []);

  // ⬇ Fetch existing student if in edit mode
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/student_list/${id}`)
        .then((res) => setStudent(res.data))
        .catch((err) => console.error("Error fetching student:", err));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/student_list/${id}`, student);
        alert("Student updated!");
      } else {
        await axios.post("http://localhost:3001/student_list", student);
        alert("Student added!");
      }
      router.push("/student");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  // Static options
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const bloodOptions = [
    { label: "A+", value: "A+" },
    { label: "B+", value: "B+" },
    { label: "O", value: "O" },
  ];
  const religionOptions = [
    { label: "Hindu", value: "Hindu" },
    { label: "Islam", value: "Islam" },
    { label: "Christian", value: "Christian" },
  ];

  // Class options from feesList
  const classOptions = feesList.map((item) => ({
    label: item.class,
    value: item.class,
  }));

  return (
    <LayoutWrapper>
      <Typography variant="h5">Update Student Record</Typography>
      <BasicBreadcrumbs currentPage="Update Student Record" />
      <Paper className="innerWrapper" style={{ padding: "1.5rem", marginTop: "1rem" }}>
      
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>Student Details</Typography>
          <Grid container spacing={2}>
            <Grid size={3}>
              <BasicInput label="First Name*" inputType="text" name="fname" value={student.fname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Last Name*" inputType="text" name="lname" value={student.lname} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Gender" value={student.gender} onChange={(val) => handleSelectChange("gender", val)} options={genderOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Date Of Birth*" inputType="date" name="dob" value={student.dob} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Roll No" inputType="text" name="roll_no" value={student.roll_no} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Blood Group" value={student.blood_group} onChange={(val) => handleSelectChange("blood_group", val)} options={bloodOptions} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Religion*" value={student.religion} onChange={(val) => handleSelectChange("religion", val)} options={religionOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Email" inputType="email" name="email" value={student.email} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <SelectInput label="Class" value={student.class} onChange={(val) => handleSelectChange("class", val)} options={classOptions} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Fees" inputType="text" name="fees" value={student.fees} onChange={handleChange}  />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Admission ID" inputType="text" name="admission_id" value={student.admission_id} onChange={handleChange} />
            </Grid>
            <Grid size={3}>
              <BasicInput label="Phone" inputType="text" name="phone" value={student.phone} onChange={handleChange} />
            </Grid>

            <Grid size={12}>
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setStudent((prev) => ({
                        ...prev,
                        image: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {student.image && (
                <img
                  src={student.image}
                  alt="Student"
                  style={{ width: "80px", height: "80px", borderRadius: "50%", marginTop: "10px", objectFit: "cover" }}
                />
              )}
            </Grid>

            <Grid size={12}>
              <CustomTextarea label="Address" placeholder="Write here..." minRows={3} name="address" value={student.address} onChange={handleChange} />
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
                      roll_no: "",
                      blood_group: "",
                      religion: "",
                      email: "",
                      class: "",
                      fees: "",
                      admission_id: "",
                      phone: "",
                      address: "",
                      image: "",
                    })
                  }
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LayoutWrapper>
  );
};

export default Dashboard;
