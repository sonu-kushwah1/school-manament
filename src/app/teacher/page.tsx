"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers, deleteTeacher } from "@/redux/slice/techerSlice";
import type { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "fname", headerName: "First name", width: 130 },
  { field: "lname", headerName: "Last name", width: 130 },
  { field: "gender", headerName: "Gender", width: 90 },
  { field: "address", headerName: "Address", width: 150 },
  { field: "dob", headerName: "DOB", width: 100 },
  { field: "phone", headerName: "Phone", width: 120 },
];

function Teacher() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: users,
    loading,
    error,
  } = useSelector((state: RootState) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
    // console.log("Fetched Teachers:", users);
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTeacher(id)).then(() => {
      dispatch(fetchTeachers()); // refetch after delete
    });
  };

  return (
    <LayoutWrapper>
      <Typography variant="h5" gutterBottom>
        Teacher List
      </Typography>
      <BasicBreadcrumbs currentPage="Teacher List" />

      {loading ? (
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      ) : (
        <DataTable
          columns={columns}
          rows={users}
          checkboxSelection
          onView={(row) => router.push(`/teacher-details/${row.id}`)}
          onEdit={(row) => router.push(`/add-teacher/${row.id}`)}
          onDelete={(row) => handleDelete(row.id)}
        />
      )}
    </LayoutWrapper>
  );
}

export default Teacher;
