"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Paper, Stack } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import SelectInput from "@/component/selectTwo";
import CustomButton from "@/component/button";
import CustomTextarea from "@/component/TextArea";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leaveId = searchParams.get("id"); // leave ID from query param

  const [leave, setLeave] = useState({
    employee_name: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "Pending",
  });

  const leaveTypeOptions = [
    { label: "Earn Leave", value: "Earn Leave" },
    { label: "Composite Leave", value: "Composite Leave" },
    { label: "Seek Leave", value: "Seek Leave" },
  ];

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (leaveId) {
        await axios.put(`http://localhost:3001/leave_list/${leaveId}`, leave);
        toast.success("Leave updated Successfully!");
      } else {
        await axios.post("http://localhost:3001/leave_list", leave);
        toast.success("Leave added successfully!");
      }
      router.push("/leave");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  useEffect(() => {
    const fetchLeave = async () => {
      if (leaveId) {
        try {
          const res = await axios.get(`http://localhost:3001/leave_list/${leaveId}`);
          setLeave(res.data);
        } catch (err) {
          console.error("Error fetching leave", err);
        }
      }
    };
    fetchLeave();
  }, [leaveId]);

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading={leaveId ? "Edit Leave" : "Add New Leave"} currentPage={leaveId ? "Edit Leave" : "Add New Leave"} />
      <Paper className="innerWrapper" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <BasicInput
                label="Employee Name"
                inputType="text"
                name="employee_name"
                value={leave.employee_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <SelectInput
                label="Leave Type"
                value={leave.leave_type}
                onChange={(val) => handleSelectChange("leave_type", val)}
                options={leaveTypeOptions}
              />
            </Grid>
            <Grid size={4}>
              <SelectInput
                label="Status"
                value={leave.status}
                onChange={(val) => handleSelectChange("status", val)}
                options={statusOptions}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="Start Date"
                inputType="date"
                name="start_date"
                value={leave.start_date}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <BasicInput
                label="End Date"
                inputType="date"
                name="end_date"
                value={leave.end_date}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <CustomTextarea
                label="Reason"
                placeholder="Write here..."
                minRows={3}
                name="reason"
                value={leave.reason}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <CustomButton type="submit" className="mainBtn" label={leaveId ? "Update" : "Save"} />
                <CustomButton
                  type="button"
                  className="mainBtn lightBtn"
                  label="Reset"
                  onClick={() =>
                    setLeave({
                      employee_name: "",
                      leave_type: "",
                      start_date: "",
                      end_date: "",
                      reason: "",
                      status: "Pending",
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

export default Dashboard;
