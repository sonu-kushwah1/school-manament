"use client";
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  Divider,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";

import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import Fingerprint from "@mui/icons-material/Fingerprint";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Stack } from "@mui/material";

import SimpleDialog from "@/component/modal";
import BasicInput from "@/component/custom-input";
import CustomButton from "@/component/button";
import BankDetails from "./bank-details";
import PaySlip from "./payslip";
import Profile from "./profile";

// Info item reusable component
type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  </Stack>
);

// Tab panel reusable component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Employees: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const educationData = [
    { label: "Hight School", value: "The Sait Vicent Hight Secondary School" },
    { label: "Hight Secondary", value: "Atit Bal Mandir " },
    { label: "Graduation", value: "Technical Support" },
    { label: "Post Graduation", value: "Communication" },
  ];

  const paySlipData = [
    { label: "Basic Salary", value: "30,000" },
    { label: "PF", value: "4000" },
    { label: "ESI Insurance", value: "400" },
    { label: "Net Salary", value: "26000" },
  ];

  

  return (
    <LayoutWrapper>
      <BasicBreadcrumbs heading="Employees Profile" currentPage="Employees Profile" />
      <Box className="customBox">
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid size={4}>
            {/* <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
              }}
            >
             
              <Box
                sx={{
                  height: 100,
                  backgroundImage: "url('/banner.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

             
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  mt: -6,
                }}
              >
                <Avatar
                  src="/george.jpg"
                  sx={{ width: 96, height: 96, border: "3px solid white" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: "calc(50% - 48px)",
                    bgcolor: "white",
                    boxShadow: 1,
                  }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>

         
              <Box textAlign="center" mt={1}>
                <Typography variant="h6" fontWeight="bold">
                  George Arafat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Junior Technician
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  84703234
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

             
              <Box px={2} pb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Basic Information
                </Typography>
                <Stack spacing={1.2} mt={1}>
                  <InfoItem
                    icon={<EmailIcon />}
                    label="Email"
                    value="hellogeorge@gmail.com"
                  />
                  <InfoItem
                    icon={<PhoneIcon />}
                    label="Mobile Phone"
                    value="+33254483540"
                  />
                 
                  <InfoItem icon={<WcIcon />} label="Gender" value="Male" />
                  <InfoItem
                    icon={<CalendarTodayIcon />}
                    label="DOB"
                    value="32"
                  />
                
                 
                  <InfoItem
                    icon={<WorkIcon />}
                    label="Designation"
                    value="Software Engineer"
                  />
                </Stack>
              </Box>
            </Paper> */}

            <Profile/>
          </Grid>

          {/* Right Column */}
          <Grid size={8}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Personal Information" {...a11yProps(0)} />
                  <Tab label="Education Details" {...a11yProps(1)} />
                  <Tab label="Payslips" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BankDetails/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Paper
                  sx={{
                    padding: "15px",
                    borderRadius: "15px",
                    marginBottom: "30px",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <AccountCircleIcon />
                      <Typography variant="h6">
                        Education Information
                      </Typography>
                    </Stack>
                    <IconButton aria-label="fingerprint" color="success">
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Box>
                    {/* Information rows */}
                    <Stack spacing={1.5}>
                      {educationData.map((item, index) => (
                        <React.Fragment key={index}>
                          <Grid container>
                            <Grid size={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.label}
                              </Typography>
                            </Grid>
                            <Grid size={6}>
                              <Typography variant="body2" color="text.primary">
                                {item.value}
                              </Typography>
                            </Grid>
                          </Grid>
                          {index !== educationData.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
               <PaySlip/>
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
};

export default Employees;
