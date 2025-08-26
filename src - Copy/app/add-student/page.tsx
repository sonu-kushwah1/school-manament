"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Grid, Paper, Stack, Box } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import { toast } from "react-toastify";

const AddStudent: React.FC = () => {
  // Dropdown options
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

  const router = useRouter();
  const { id } = useParams(); // for edit mode

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
    image: "",
    address: "",
  });

  const [feesList, setFeesList] = useState<any[]>([]);
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Fetch fees_list from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/fees_list")
      .then((res) => {
        const order = [
          "Nursery",
          "L.K.G",
          "U.K.G",
          "1st",
          "2nd",
          "3rd",
          "4th",
          "5th",
          "6th",
          "7th",
          "8th",
          "9th",
          "10th",
          "11th",
          "12th",
        ];

        // sort API data by class
        const sortedData = res.data.sort(
          (a: any, b: any) => order.indexOf(a.class) - order.indexOf(b.class)
        );

        setFeesList(sortedData);

        // also set sorted classOptions
        setClassOptions(
          sortedData.map((item: any) => ({
            label: item.class,
            value: item.class,
          }))
        );
      })
      .catch((err) => console.error("Error fetching fees list:", err));
  }, []);

  // If editing student
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/student_list/${id}`)
        .then((res) => setStudent(res.data))
        .catch((err) => console.error("Error fetching student:", err));
    }
  }, [id]);

  // Input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Select handler
  const handleSelectChange = (name: string, value: string) => {
    setStudent((prev) => ({ ...prev, [name]: value }));

    // Auto-update fees when class changes
    if (name === "class") {
      const found = feesList.find((item) => item.class === value);
      if (found) {
        setStudent((prev) => ({ ...prev, fees: found.fees }));
      } else {
        setStudent((prev) => ({ ...prev, fees: "" }));
      }
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/student_list/${id}`, student);
        toast.success("Student updated!");
      } else {
        await axios.post("http://localhost:3001/student_list", student);
        toast.success("Student added!");
      }
      router.push("/student");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading={id ? "Edit Student" : "Add New Student"}
        currentPage={id ? "Edit Student" : "Add New Student"}
      />
      <Paper
        className="innerWrapper"
        style={{ padding: "1.5rem", marginTop: "1rem" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid size={3}>
              <BasicInput
                label="First Name*"
                inputType="text"
                name="fname"
                value={student.fname}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Last Name */}
            <Grid size={3}>
              <BasicInput
                label="Last Name*"
                inputType="text"
                name="lname"
                value={student.lname}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Gender */}
            <Grid size={3}>
              <SelectInput
                label="Gender"
                value={student.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
                required
              />
            </Grid>
            {/* DOB */}
            <Grid size={3}>
              <BasicInput
                label="Date Of Birth*"
                inputType="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Roll No */}
            <Grid size={3}>
              <BasicInput
                label="Roll No"
                inputType="text"
                name="roll_no"
                value={student.roll_no}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Blood Group */}
            <Grid size={3}>
              <SelectInput
                label="Blood Group"
                value={student.blood_group}
                onChange={(val) => handleSelectChange("blood_group", val)}
                options={bloodOptions}
                required
              />
            </Grid>
            {/* Religion */}
            <Grid size={3}>
              <SelectInput
                label="Religion*"
                value={student.religion}
                onChange={(val) => handleSelectChange("religion", val)}
                options={religionOptions}
                required
              />
            </Grid>
            {/* Email */}
            <Grid size={3}>
              <BasicInput
                label="Email"
                inputType="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Class */}
            <Grid size={3}>
              <SelectInput
                label="Class"
                value={student.class}
                onChange={(val) => handleSelectChange("class", val)}
                options={classOptions} // from API
                required
              />
            </Grid>
            {/* Fees (auto-filled, read-only) */}
            <Grid size={3}>
              <BasicInput
                label="Fees"
                inputType="number"
                name="fees"
                value={student.fees}
                onChange={handleChange}
                disabled // read-only
                required
              />
            </Grid>
            {/* Admission ID */}
            <Grid size={3}>
              <BasicInput
                label="Admission ID"
                inputType="text"
                name="admission_id"
                value={student.admission_id}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Phone */}
            <Grid size={3}>
              <BasicInput
                label="Phone"
                inputType="text"
                name="phone"
                value={student.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setStudent((prev) => ({ ...prev, phone: value }));
                  }
                }}
                inputProps={{ maxLength: 10 }} //
                required
              />
            </Grid>

            {/* Image Upload */}
            <Grid size={12}>
              <label>Upload Image</label>
              <Box className="fileUpload">
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
              </Box>
              <label>Preview Profile</label>
              <Box>
                {student.image && (
                  <img
                    src={student.image}
                    alt="Student"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
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

            {/* Buttons */}
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
                      image: "",
                      address: "",
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

export default AddStudent;
