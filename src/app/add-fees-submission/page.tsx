"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GridColDef } from "@mui/x-data-grid";
import SelectInput from "@/component/selectTwo";
import BasicInput from "@/component/custom-input";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import CustomButton from "@/component/button";
import DataTable from "@/component/Table";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  { field: "display_id", headerName: "ID", width: 70 },
  { field: "fname", headerName: "Student Name", width: 150 },
  { field: "class", headerName: "Class", width: 100 },
  { field: "fees", headerName: "Total Fees", width: 100 },
  { field: "sub_fees", headerName: "Submitted Fees", width: 150 },
  { field: "due_fees", headerName: "Due Fees", width: 100},
];

const Transport = () => {
  const classOptions = [
    { label: "Nursery", value: "Nursery" },
    { label: "L.K.G", value: "L.K.G" },
    { label: "U.K.G", value: "U.K.G" },
    { label: "1st", value: "1st" },
    { label: "2nd", value: "2nd" },
    { label: "3rd", value: "3rd" },
    { label: "4th", value: "4th" },
    { label: "5th", value: "5th" },
    { label: "6th", value: "6th" },
    { label: "7th", value: "7th" },
    { label: "8th", value: "8th" },
    { label: "9th", value: "9th" },
    { label: "10th", value: "10th" },
    { label: "11th", value: "11th" },
    { label: "12th", value: "12th" },
  ];

  const router = useRouter();

  const [student, setStudent] = useState({
    sname: "",
    sclass: "",
    total_fees: "",
    fees: "",
    due_fees: "",
  });

  const [studentOptions, setStudentOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [FeesList, setFeesList] = useState<any[]>([]);
  const [filteredFeesList, setFilteredFeesList] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/student_list");

      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        display_id: index + 1,
      }));
      
      console.log(updatedData);
      setFeesList(updatedData);
      setFilteredFeesList(updatedData);

      const names = response.data.map((item: any) => ({
        label: item.sname,
        value: item.sname,
      }));
      setStudentOptions(names);
    } catch (error) {
      setError("Error fetching student data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

const filterTableData = (filterName: string, filterValue: string) => {
  let filtered = [...FeesList];

  // Apply class filter
  if (filterName === "sclass" || student.sclass) {
    const classToMatch = filterName === "sclass" ? filterValue : student.sclass;
    if (classToMatch) {
      filtered = filtered.filter((item) => item.sclass === classToMatch);
    }
  }

  // Apply name filter
  if (filterName === "sname" || student.sname) {
    const nameToMatch = filterName === "sname" ? filterValue : student.sname;
    if (nameToMatch) {
      filtered = filtered.filter((item) => item.sname === nameToMatch);
    }
  }

  setFilteredFeesList(filtered);
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...student, [name]: value };

    if (name === "fees" || name === "total_fees") {
      const total = parseFloat(updated.total_fees || "0");
      const paid = parseFloat(updated.fees || "0");
      updated.due_fees = (total - paid).toString();
    }

    setStudent(updated);
  };

 const handleSelectChange = (name: string, value: string) => {
  setStudent((prev) => {
    const updated = { ...prev, [name]: value };
    filterTableData(name, value);
    return updated;
  });
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && editId !== null) {
      try {
        await axios.put(
          `http://localhost:3001/student_list/${editId}`,
          student
        );
        toast.success("Fees record Submited successfully!");
        setIsEditMode(false);
        setEditId(null);
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error updating record", err);
      }
    } else {
      try {
        await axios.post("http://localhost:3001/student_list", student);
        toast.success("Fees created successfully!");
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error submitting form", err);
      }
    }
  };

  const handleEdit = (row: any) => {
    setStudent(row);
    setEditId(row.id);
    setIsEditMode(true);
  };

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/student_list/${id}`);
      toast.success("Fees");
      getAPI();
    } catch (error) {
      console.error("Failed to delete record", error);
      setError("Failed to delete record");
    }
  };

  const resetForm = () => {
    setStudent({
      sname: "",
      sclass: "",
      total_fees: "",
      fees: "",
      due_fees: "",
    });
    setIsEditMode(false);
    setEditId(null);
    setFilteredFeesList(FeesList);
  };

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Add Fees Submission" currentPage="Add Fees Submission" />

      <Box className="customBox">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={3}>
              <SelectInput
                label="Class"
                value={student.sclass}
                onChange={(val) => handleSelectChange("sclass", val)}
                options={classOptions}
              />
            </Grid>
            <Grid size={3}>
              <SelectInput
                label="Student Name"
                value={student.sname}
                onChange={(val) => handleSelectChange("sname", val)}
                options={studentOptions}
              />
            </Grid>
            <Grid size={2}>
              <BasicInput
                label="Total Fees"
                inputType="text"
                name="total_fees"
                value={student.total_fees}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={2}>
              <BasicInput
                label="Fees"
                inputType="text"
                name="fees"
                value={student.fees}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={2}>
              <BasicInput
                label="Due Fees"
                inputType="text"
                name="due_fees"
                value={student.due_fees}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton
                  type="submit"
                  className="mainBtn"
                  label={isEditMode ? "Update" : "Save"}
                />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={resetForm}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box className="customBox">
        <Typography variant="h5">All Fees List</Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : !filteredFeesList.length ? (
          <Typography sx={{ mt: 2 }}>No records found.</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={filteredFeesList}
            checkboxSelection
            onEdit={handleEdit}
            onDelete={(row) => remove(row.id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Transport;
