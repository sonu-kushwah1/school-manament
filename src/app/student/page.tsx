"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  { field: "tableId", headerName: "Id", width: 70 },
  { field: "fname", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
  { field: "gender", headerName: "Gender", width: 90 },
  { field: "class", headerName: "Class", sortable: false, width: 100 },
  { field: "fees", headerName: "Fees", width: 90 },
  { field: "address", headerName: "Address", width: 90 },
  { field: "dob", headerName: "DOB", width: 90 },
  { field: "phone", headerName: "Phone", width: 90 },
];

function Student() {
  const router = useRouter();

  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");

  // filters
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  // Dropdown options
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [studentOptions, setStudentOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/student_list");

      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        tableId: index + 1,
      }));

      setAllStudents(updatedData);
      setStudent(updatedData);

      // unique class list
      const classes = [
        ...new Set(updatedData.map((s: any) => s.class || "")),
      ].map((c) => ({
        label: String(c),
        value: String(c),
      }));
      setClassOptions(classes);
    } catch (error) {
      setError("Error fetching student data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  // Filter student list when dropdowns change
  useEffect(() => {
    let filtered = [...allStudents];

    if (selectedClass) {
      filtered = filtered.filter((s) => s.class === selectedClass);
    }

    if (selectedStudent) {
      filtered = filtered.filter(
        (s) => `${s.fname} ${s.lname}` === selectedStudent
      );
    }

    setStudent(filtered);

    // set student options based on class filter
    const students = filtered.map((s) => ({
      label: `${s.fname} ${s.lname}`,
      value: `${s.fname} ${s.lname}`,
    }));
    setStudentOptions(students);
  }, [selectedClass, selectedStudent, allStudents]);

  const remove = async (backendId: number) => {
    try {
      await axios.delete(`http://localhost:3001/student_list/${backendId}`);
      toast.success("Student Remove Successfully!");
      getAPI();
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Student List" currentPage="Student" />
      <form>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid size={3}>
            <SelectInput
              label="Class"
              value={selectedClass}
              onChange={(val) => {
                setSelectedClass(val);
                setSelectedStudent(""); // reset student when class changes
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
          <Grid size={1}>
            <CustomButton
              label="Reset"
              onClick={() => {
                setSelectedClass("");
                setSelectedStudent("");
                setStudent(allStudents);
              }}
            />
          </Grid>
          <Grid size={2}>
            <CustomButton
              label="Add Student"
              onClick={() => {
                router.push("/add-student");
              }}
            />
          </Grid>
        </Grid>
      </form>
      <Box className="customBox" sx={{ marginTop: "20px" }}>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : student.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No records found.</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={student}
            checkboxSelection
            onView={(row) => router.push(`/studentDetails/${row.id}`)}
            onEdit={(row) => router.push(`/add-student/${row.id}`)}
            onDelete={(row) => remove(row.id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
}

export default Student;
