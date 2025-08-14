'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack, Paper, IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Image from "next/image";
import IMAGES from "@/assets/images";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeacherById } from "@/redux/slice/techerSlice";
import type { RootState, AppDispatch } from "@/store";

const TeacherDetails: React.FC = () => {
  const { id } = useParams();
  const teacherId = Number(id);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { singleTeacher: teacher, loading, error } = useSelector((state: RootState) => state.teachers);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchTeacherById(teacherId));
    }
  }, [dispatch, teacherId]);

  const buttonData = [
    { icon: <DriveFileRenameOutlineIcon />, color: "secondary", label: "edit" },
    { icon: <LocalPrintshopIcon />, color: "success", label: "print" },
    { icon: <FileDownloadIcon />, color: "success", label: "download" },
  ];

  if (loading) return <div>Loading...</div>;
  if (!teacher) return <div>Teacher not found.</div>;

  return (
    <LayoutWrapper>
      <Typography variant="h5">Teacher Details</Typography>
      <BasicBreadcrumbs currentPage="Teacher Details" />
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ paddingBottom: "20px" }}>About Me</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Image
                src={IMAGES.StudentImages} // or replace with actual teacher image
                alt="teacherProfile"
                className="img-fluid"
              />
            </Grid>
            <Grid size={8}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <Typography variant="h6" sx={{ paddingBottom: "15px" }}>
                    {teacher.fname} {teacher.lname}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    {buttonData.map((btn, index) => (
                      <IconButton
                        key={index}
                        sx={{
                          background: "#f0f1f3",
                          borderRadius: "4px",
                          color: "#646464",
                          fontSize: "14px",
                          padding: "7px 12px",
                        }}
                        aria-label={btn.label}
                      >
                        {btn.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Grid>
              </Grid>

              <table className="normalTable" style={{ marginTop: "25px" }}>
                <tbody>
                  <tr><td>First Name:</td><td className="contentData">{teacher.fname}</td></tr>
                  <tr><td>Last Name:</td><td className="contentData">{teacher.lname}</td></tr>
                  <tr><td>Gender:</td><td className="contentData">{teacher.gender}</td></tr>
                  <tr><td>Date Of Birth:</td><td className="contentData">{teacher.dob}</td></tr>
                  <tr><td>Email:</td><td className="contentData">{teacher.email}</td></tr>
                  <tr><td>Phone:</td><td className="contentData">{teacher.phone}</td></tr>
                  <tr><td>City:</td><td className="contentData">{teacher.city}</td></tr>
                  <tr><td>University:</td><td className="contentData">{teacher.univercity}</td></tr>
                  <tr><td>Degree:</td><td className="contentData">{teacher.degree}</td></tr>
                  <tr><td>Address:</td><td className="contentData">{teacher.address}</td></tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LayoutWrapper>
  );
};

export default TeacherDetails;
