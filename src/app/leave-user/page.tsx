"use client";
import { MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Stack, Paper } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import CustomButton from "@/component/button";
import DataTable from "@/component/Table";
import axios from "axios";

const Leave: React.FC = () => {
  const [leaveList, setLeaveList] = useState<any[]>([]);

  // Fetch leave data
  useEffect(() => {
    axios
      .get("http://localhost:3001/leave_list")
      .then((res) => setLeaveList(res.data))
      .catch((err) => console.error("Error fetching leave list:", err));
  }, []);

  const columns: GridColDef[] = [
    {
      field: "serial",
      headerName: "No",
      width: 70,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, any>) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(
          params.id as GridRowId
        );
        return index !== null ? index + 1 : "";
      },
    },
    { field: "employee_name", headerName: "Name of Employees", width: 180 },
    { field: "leave_type", headerName: "Type of Leave", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params: GridRenderCellParams<any, any>) => {
        const statusColors: Record<string, string> = {
          Pending: "#e69b10ff", // Yellow
          Approved: "#0b630eff", // Green
          Rejected: "#be261cff", // Red
        };

        return (
          <Typography
            variant="body2"
            sx={{
              backgroundColor: `${statusColors[params.row.status] || "#fff"}22`,
              color: statusColors[params.row.status] || "#000",
              fontWeight: 600,
              borderRadius: "6px",
              px: 1.5,
              py: 0.5,
              textAlign: "center",
              display: "inline-block",
              width: "100%",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },

    { field: "start_date", headerName: "Start Date", width: 180 },
    { field: "end_date", headerName: "End Date", width: 180 },
    { field: "reason", headerName: "Reason", width: 120 },
  ];

  return (
    <LayoutWrapper>
      <Typography variant="h6">Leave List User</Typography>
      <BasicBreadcrumbs currentPage="Leave" />
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Leave List User</Typography>

        {/* DataTable Component */}
        <DataTable columns={columns} rows={leaveList} />
      </Paper>
    </LayoutWrapper>
  );
};

export default Leave;
