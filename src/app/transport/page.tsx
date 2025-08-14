"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import CustomButton from "@/component/button";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "display_id", headerName: "ID", width: 70 },
  { field: "rname", headerName: "Route Name", width: 130 },
  { field: "vname", headerName: "Vehicle No", width: 130 },
  { field: "dname", headerName: "Driver Name", width: 130 },
  { field: "licens_no", headerName: "License Number", width: 130 },
  {
    field: "phone_no",
    headerName: "Contact Number",
    sortable: false,
    width: 130,
  },
];

const Transport = () => {
  const router = useRouter();

  const [driver, setDriver] = useState({
    rname: "",
    vname: "",
    dname: "",
    lname: "",
    licens_no: "",
    phone_no: "",
  });

  const [driverList, setDriverList] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch list
  const getAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transport_list");
      // const updatedData = response.data.map((item: any, index: number) => ({
      //   ...item,
      //   id: item.id || index + 1, // preserve original id
      // }));
      const updatedData = response.data.map((item: any, index: number) => ({
        ...item,
        display_id: index + 1, // This is just for table display
      }));
      setDriverList(updatedData);
    } catch (error) {
      setError("Error fetching transport data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && editId !== null) {
      try {
        await axios.put(
          `http://localhost:3002/transport_list/${editId}`,
          driver
        );
        alert("Driver record updated successfully!");
        setIsEditMode(false);
        setEditId(null);
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error updating record", err);
      }
    } else {
      try {
        await axios.post("http://localhost:3002/transport_list", driver);
        alert("Driver record inserted successfully!");
        getAPI();
        resetForm();
      } catch (err) {
        console.error("Error submitting form", err);
      }
    }
  };

  const handleEdit = (row: any) => {
    setDriver(row);
    setEditId(row.id);
    setIsEditMode(true);
  };

  const remove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3002/transport_list/${id}`);
      getAPI();
    } catch (error) {
      console.error("Failed to delete student", error);
      setError("Failed to delete student");
    }
  };

  const resetForm = () => {
    setDriver({
      rname: "",
      vname: "",
      dname: "",
      lname: "",
      licens_no: "",
      phone_no: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5">Transport</Typography>
      <BasicBreadcrumbs currentPage="Transport" />

      <Box className="customBox">
        <Typography variant="h5">
          {isEditMode ? "Edit" : "Add New"} Transport
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <BasicInput
                label="Route Name"
                inputType="text"
                name="rname"
                value={driver.rname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Vehicle Number"
                inputType="text"
                name="vname"
                value={driver.vname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Driver Name"
                inputType="text"
                name="dname"
                value={driver.dname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="License Number"
                inputType="text"
                name="licens_no"
                value={driver.licens_no}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Phone Number"
                inputType="text"
                name="phone_no"
                value={driver.phone_no}
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
        <Typography variant="h5">All Transport Lists</Typography>
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : !driverList.length ? (
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        ) : (
          <DataTable
            columns={columns}
            rows={driverList}
            checkboxSelection
            onView={(row) => router.push(`/studentDetails/${row.id}`)}
            onEdit={handleEdit}
            onDelete={(row) => remove(row.id)}
          />
        )}
      </Box>
    </LayoutWrapper>
  );
};

export default Transport;
