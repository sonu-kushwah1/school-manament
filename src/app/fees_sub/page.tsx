"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box, Container,Typography, Button } from "@mui/material";
import axios from "axios";
import SelectInput from "@/component/selectTwo";
import BasicInput from "@/component/custom-input";
import LayoutWrapper from "@/component/Layout";
import BasicBreadcrumbs from "@/component/BreadCrumb";

interface Student {
  id: number;
  fname: string;
  class: string;
  fees: number;
  submitFees: number;
  dueFees: number;
}

interface FeeClass {
  id: number;
  class: string;
}

const normalizeClass = (str: string) =>
  str.replace(/\./g, "").replace(/\s+/g, "").toLowerCase();

const FeesSub: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [studentOptions, setStudentOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [submitAmount, setSubmitAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch classes
  useEffect(() => {
    axios
      .get("http://localhost:3001/fees_list")
      .then((res) => {
        const options = [
          { label: "All", value: "" },
          ...res.data.map((item: FeeClass) => ({
            label: item.class,
            value: item.class,
          })),
        ];
        setClassOptions(options);
      })
      .catch((err) => console.error("Error fetching class list:", err));
  }, []);

  // Fetch students
  useEffect(() => {
    axios
      .get("http://localhost:3001/student_list")
      .then((res) => {
        const dataWithDue = res.data.map((student: any) => {
          const fees = Number(student.fees) || 0;
          const submitFees = Number(student.submitFees) || 0;
          return {
            ...student,
            fees,
            submitFees,
            dueFees: fees - submitFees,
          };
        });
        setStudents(dataWithDue);
        setFilteredStudents(dataWithDue);
      })
      .catch((err) => console.error("Error fetching student list:", err))
      .finally(() => setLoading(false));
  }, []);

  // Update student dropdown & table when class/student changes
  useEffect(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = students.filter(
        (s) => normalizeClass(s.class) === normalizeClass(selectedClass)
      );
    }

    // Update student dropdown
    setStudentOptions([
      { label: "All", value: "" },
      ...filtered.map((s) => ({ label: s.fname, value: s.fname })),
    ]);

    // Update table
    if (!selectedStudent) {
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(filtered.filter((s) => s.fname === selectedStudent));
    }
  }, [selectedClass, students, selectedStudent]);

  // Handle submit fees update
  const handleSubmitFees = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }
    if (submitAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const student = students.find((s) => s.fname === selectedStudent);
    if (!student) return;

    const newSubmitFees = Number(student.submitFees) + Number(submitAmount);
    const newDueFees = Number(student.fees) - newSubmitFees;

    const updatedStudent = {
      ...student,
      submitFees: newSubmitFees,
      dueFees: newDueFees,
    };

    try {
      // Update backend (json-server PUT request)
      await axios.put(
        `http://localhost:3001/student_list/${student.id}`,
        updatedStudent
      );

      // Update local state
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? updatedStudent : s))
      );

      setSubmitAmount(0); // Reset input
    } catch (err) {
      console.error("Error updating fees:", err);
    }
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5">Add Fees Submission</Typography>
      <BasicBreadcrumbs currentPage="Add Fees Submission" />
      <Box className="customBox" mb={3}>
        <form>
          <Grid container spacing={2}>
            <Grid size={3}>
              <SelectInput
                label="Class"
                value={selectedClass}
                onChange={(val) => {
                  setSelectedClass(val);
                  setSelectedStudent("");
                }}
                options={classOptions}
              />
            </Grid>
            <Grid size={3}>
              <SelectInput
                label="Student Name"
                value={selectedStudent}
                onChange={(val) => setSelectedStudent(val)}
                options={studentOptions}
              />
            </Grid>
            <Grid size={3}>
              <BasicInput
                label="Fees Fees"
                inputType="number"
                name="total_fees"
                value={submitAmount}
                onChange={(e) => setSubmitAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid size={3} style={{ display: "flex", alignItems: "end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitFees}
              >
                Update Fees
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <div className="custom-table-container attendance">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Fees</th>
              <th>Submit Fees</th>
              <th>Due Fees</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.fname}</td>
                  <td>{student.class}</td>
                  <td>{student.fees}</td>
                  <td>{student.submitFees}</td>
                  <td>{student.dueFees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
};

export default FeesSub;
