"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack, Box } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

const UpdateStudent: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

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
  const [feesList, setFeesList] = useState<any[]>([]);
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);

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

        const sortedData = res.data.sort(
          (a: any, b: any) => order.indexOf(a.class) - order.indexOf(b.class)
        );

        setFeesList(sortedData);

        setClassOptions(
          sortedData.map((item: any) => ({
            label: item.class,
            value: item.class,
          }))
        );
      })
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

  

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs
        heading="Edit Student"
        currentPage="Edit Student"
      />
      <Paper
        className="innerWrapper"
        style={{ padding: "1.5rem", marginTop: "1rem" }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Student Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="First Name*"
                inputType="text"
                name="fname"
                value={student.fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Last Name*"
                inputType="text"
                name="lname"
                value={student.lname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Gender"
                value={student.gender}
                onChange={(val) => handleSelectChange("gender", val)}
                options={genderOptions}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Date Of Birth*"
                inputType="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Roll No"
                inputType="text"
                name="roll_no"
                value={student.roll_no}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Blood Group"
                value={student.blood_group}
                onChange={(val) => handleSelectChange("blood_group", val)}
                options={bloodOptions}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Religion*"
                value={student.religion}
                onChange={(val) => handleSelectChange("religion", val)}
                options={religionOptions}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Email"
                inputType="email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <SelectInput
                label="Class"
                value={student.class}
                onChange={(val) => handleSelectChange("class", val)}
                options={classOptions}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Fees"
                inputType="text"
                name="fees"
                value={student.fees}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
              <BasicInput
                label="Admission ID"
                inputType="text"
                name="admission_id"
                value={student.admission_id}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg:3 }}>
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
                required
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

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

export default UpdateStudent;
