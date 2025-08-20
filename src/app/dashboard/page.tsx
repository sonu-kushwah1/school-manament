"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import axios from "axios";
import { useRouter } from "next/navigation";

// Types
interface DashboardItem {
  id: number;
  title: string;
  no: string;
}


const Dashboard: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();


  /*login token*/
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // 🚫 If no token, redirect to login
      router.push("/login");
    }
  }, [router]);


  // State for dynamic values
  const [studentCount, setStudentCount] = useState("0");
  const [teacherCount, setTeacherCount] = useState("0");
  const [employeeCount, setEmployeeCount] = useState("0");

  // Fetch data from all APIs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, employeesRes] = await Promise.all([
          axios.get("http://localhost:3001/student_list"),
          axios.get("http://localhost:3001/teacher_list"),
          axios.get("http://localhost:3001/emp_list"),
        ]);

        setStudentCount(studentsRes.data.length.toString());
        setTeacherCount(teachersRes.data.length.toString());
        setEmployeeCount(employeesRes.data.length.toString());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Dashboard data array
  const DashboardData: DashboardItem[] = [
    {
      id: 1,
      title: "Total Students",
      no: studentCount,
    },
    {
      id: 2,
      title: "Total Employees",
      no: employeeCount,
    },
    {
      id: 3,
      title: "Total Teachers",
      no: teacherCount,
    },
  ];

  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Dashboard" currentPage="Dashboard" />

        <Grid container spacing={2}>
          {DashboardData.map((item) => (
            <Grid size={4} key={item.id}>
              <Box
                className={styled.dashboardCard}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" sx={{color:"white"}}>{item.no}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </LayoutWrapper>
    </div>
  );
};

export default Dashboard;
