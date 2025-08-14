'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box, Stack } from "@mui/material";
import styled from "./styled.module.css";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Image from "next/image";
import IMAGES from "@/assets/images";
import IconButton from "@mui/material/IconButton";
import html2pdf from 'html2pdf.js';

const StudentDetails: React.FC = () => {
  
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const buttonData = [
    { icon: <DriveFileRenameOutlineIcon />, color: "secondary", label: "edit", action: () => alert("Edit Clicked") },
    { icon: <LocalPrintshopIcon />, color: "success", label: "print", action: () => handlePrint() },
    { icon: <FileDownloadIcon />, color: "success", label: "download", action: () => handleDownloadPDF() },
  ];

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/student_list/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch student:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const win = window.open('', '', 'width=900,height=650');
      if (win) {
        win.document.write('<html><head><title>Print Student Record</title>');
        win.document.write('</head><body>');
        win.document.write(printContents);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        setTimeout(() => {
          win.print();
          win.close();
        }, 500);
      }
    }
  };

  const handleDownloadPDF = () => {
    if (printRef.current) {
      html2pdf().from(printRef.current).save('student-record.pdf');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <LayoutWrapper>
      <Typography variant="h5">Student Details</Typography>
      <BasicBreadcrumbs currentPage="Student Details" />
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ paddingBottom: "20px" }}>About Me</Typography>
        <Box ref={printRef}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Image
                src={IMAGES.StudentImages}
                alt="studentProfile"
                className="img-fluid"
              />
            </Grid>
            <Grid size={8}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <Typography variant="h6" sx={{ paddingBottom: "15px" }}>
                    {student.name}
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
                        onClick={btn.action}
                      >
                        {btn.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
              <Typography>
                {student.about || "No description available."}
              </Typography>

              <table className="normalTable" style={{ marginTop: "25px" }}>
                <tbody>
                  <tr><td>Name:</td><td className="contentData">{student.fname}</td></tr>
                  <tr><td>Gender:</td><td className="contentData">{student.gender}</td></tr>
                  <tr><td>Date Of Birth:</td><td className="contentData">{student.dob}</td></tr>
                  <tr><td>Religion:</td><td className="contentData">{student.religion}</td></tr>
                  <tr><td>E-mail:</td><td className="contentData">{student.email}</td></tr>
                  <tr><td>Class:</td><td className="contentData">{student.class}</td></tr>
                  <tr><td>Section:</td><td className="contentData">{student.section}</td></tr>
                  <tr><td>Roll:</td><td className="contentData">{student.roll_no}</td></tr>
                  <tr><td>Address:</td><td className="contentData">{student.address}</td></tr>
                  <tr><td>Phone:</td><td className="contentData">{student.phone}</td></tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LayoutWrapper>
  );
};

export default StudentDetails;
