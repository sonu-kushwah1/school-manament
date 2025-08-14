"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GridColDef } from "@mui/x-data-grid";
import SelectInput from "@/component/selectTwo";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import CustomButton from "@/component/button";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "display_id", headerName: "ID", width: 70 },
  { field: "class", headerName: "Class", width: 450 },
  { field: "fees", headerName: "Fees", width: 250 },
];

const Fees = () => {
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
    class: "",
    fees: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const [FeesList, setFeesList] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSelectChange = (name: string, value: string) => {
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch list
  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fees_list");

      // Original id preserve + display_id for table only
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        display_id: index + 1, // Just for table display
      }));

      setFeesList(updatedData);
    } catch (error) {
      setError("Error fetching Fees data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.class || !student.fees) {
      alert("Please fill all fields");
      return;
    }

    if (isEditMode && editId !== null) {
      // UPDATE existing record
      try {
        await axios.put(`http://localhost:3001/fees_list/${editId}`, student);
        alert("Fees record updated successfully!");
        setIsEditMode(false);
        setEditId(null);
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error updating record", err);
      }
    } else {
      // CREATE new record
      try {
        await axios.post("http://localhost:3001/fees_list", student);
        alert("Fees created successfully!");
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error submitting form", err);
      }
    }
  };

  const handleEdit = (row: any) => {
    // Only set editable fields
    setStudent({
      class: row.class,
      fees: row.fees,
    });
    setEditId(row.id); // Original JSON Server id
    setIsEditMode(true);
  };

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/fees_list/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };

  const resetForm = () => {
    setStudent({
      class: "",
      fees: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5">Fees List in 2025</Typography>
      <BasicBreadcrumbs currentPage="Fees List 2025l" />

      {/* Form */}
      <Box className="customBox">
        <Typography variant="h5">
          {isEditMode ? "Edit" : "Add New"} Fees List
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <SelectInput
                label="Class"
                value={student.class}
                onChange={(val) => handleSelectChange("class", val)}
                options={classOptions}
              />
            </Grid>
            <Grid size={6}>
              <BasicInput
                label="Fees"
                inputType="text"
                name="fees"
                value={student.fees}
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

      {/* Table */}
      <Box className="customBox">
        <Typography variant="h5">All Fees List</Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : !FeesList.length ? (
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={FeesList}
            // checkbosizeelection
            onEdit={handleEdit}
            onDelete={(row) => remove(row.id)} // Original id
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Fees;
