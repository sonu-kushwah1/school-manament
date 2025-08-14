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
  { field: "des", headerName: "Designation", width: 450 },
];

const Designation = () => {
  const router = useRouter();

  const [student, setStudent] = useState({
    des: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const [desList, setDesList] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);


  // Fetch list
  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/des_list");

      // Original id preserve + display_id for table only
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        display_id: index + 1, // Just for table display
      }));

      setDesList(updatedData);
    } catch (error) {
      setError("Error fetching Designation data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.des) {
      alert("Please fill all fields");
      return;
    }

    if (isEditMode && editId !== null) {
      // UPDATE existing record
      try {
        await axios.put(`http://localhost:3001/des_list/${editId}`, student);
        alert("Designation record updated successfully!");
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
        await axios.post("http://localhost:3001/des_list", student);
        alert("Designation created successfully!");
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
      des: row.des,
    });
    setEditId(row.id); // Original JSON Server id
    setIsEditMode(true);
  };

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/des_list/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete Designation", error);
      setError("Failed to delete Designation");
    }
  };

  const resetForm = () => {
    setStudent({
      des: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5">Designation List</Typography>
      <BasicBreadcrumbs currentPage="Designation List" />

      {/* Form */}
      <Box className="customBox">
        <Typography variant="h5">
          {isEditMode ? "Edit" : "Add New"} Designation List
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <BasicInput
                label="Designation"
                inputType="text"
                name="des"
                value={student.des}
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
        <Typography variant="h5">All Subject List</Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : !desList.length ? (
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={desList}
            // checkbosizeelection
            onEdit={handleEdit}
            onDelete={(row) => remove(row.id)} // Original id
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Designation;
