"use client";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import DataTable from "@/component/Table";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";

const API_URL = "http://localhost:5000/users"; // ✅ users endpoint

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
];

const UserPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // auth token
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // token bhejna zaroori hai
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Delete User
  const remove = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="User List" currentPage="User List" />
      <Box className="customBox">
        <DataTable
          columns={columns}
          rows={users}
          checkboxSelection
          onDelete={(row) => remove(row.id)} // ✅ fixed
        />
      </Box>
    </LayoutWrapper>
  );
};

export default UserPage;
