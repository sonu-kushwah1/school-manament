"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import InfoIcon from "@mui/icons-material/Info";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const pathname = usePathname();
  

  // Use one object to track open states
  const [openMenus, setOpenMenus] = useState({
    student: false,
    teacher: false,
    employees: false,
    fees: false,
    hrms: false,
  });
  

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Box className={`sidebar ${isSidebarOpen ? "sidebar_toggle" : ""}`}>
      <List>
        <ListItem
          component={Link}
          href="/dashboard"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

         <ListItem
          component={Link}
          href="/student_list_practice"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/student_list_practice" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Student List Test" />
        </ListItem>

        {/* Student Menu */}
        <ListItem
          className="submenu menu-link"
          onClick={() => toggleMenu("student")}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Student" />
          {openMenus.student ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse
          in={openMenus.student}
          timeout="auto"
          unmountOnExit
          className="submenu"
        >
          <List component="div">
            <ListItem
              component={Link}
              href="/student"
              className={`menu-link ${pathname === "/student" ? "active" : ""}`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                 <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="All Student List" />
            </ListItem>
            <ListItem
              component={Link}
              href="/add-student"
              className={`menu-link ${
                pathname === "/add-student" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Student" />
            </ListItem>
            {/* <ListItem
              component={Link}
              href="/studentDetails"
              className={`menu-link ${
                pathname === "/studentDetails" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Student Details" />
            </ListItem> */}
          </List>
        </Collapse>

        {/* Teacher Menu */}
        <ListItem
          className="submenu menu-link"
          onClick={() => toggleMenu("teacher")}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher" />
          {openMenus.teacher ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse
          in={openMenus.teacher}
          timeout="auto"
          unmountOnExit
          className="submenu"
        >
          <List component="div">
            <ListItem
              component={Link}
              href="/teacher"
              className={`menu-link ${pathname === "/teacher" ? "active" : ""}`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                  <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="All Teacher List" />
            </ListItem>
            <ListItem
              component={Link}
              href="/add-teacher"
              className={`menu-link ${
                pathname === "/add-teacher" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Teacher" />
            </ListItem>
            {/* <ListItem
              component={Link}
              href="/teacher-details"
              className={`menu-link ${
                pathname === "/teacher-details" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Teacher Details" />
            </ListItem> */}
          </List>
        </Collapse>

        {/* Employees Menu */}
        {/* Employees Menu */}
        <ListItem
          className="submenu menu-link"
          onClick={() => toggleMenu("employees")}
        >
          <ListItemIcon>
             <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary=" Employees" />
          {openMenus.employees ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse
          in={openMenus.employees}
          timeout="auto"
          unmountOnExit
          className="submenu"
        >
          <List component="div">
            <ListItem
              component={Link}
              href="/employees-list-test"
              className={`menu-link ${
                pathname === "/employees-list-test" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
               <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="All Employees List Test" />
            </ListItem>
          
             <ListItem
              component={Link}
              href="/employee-salary-management-test"
              className={`menu-link ${
                pathname === "/employee-salary-management-test" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Emp Salary Management" />
            </ListItem>

            <ListItem
              component={Link}
              href="/add-employee-test"
              className={`menu-link ${
                pathname === "/add-employee-test" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Add Employees Test" />
            </ListItem>
          </List>
        </Collapse>

        {/* Fees Menu */}
        <ListItem
          className="submenu menu-link"
          onClick={() => toggleMenu("fees")}
        >
          <ListItemIcon>
            <CurrencyRupeeIcon />
          </ListItemIcon>
          <ListItemText primary="Fees" />
          {openMenus.fees ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse
          in={openMenus.fees}
          timeout="auto"
          unmountOnExit
          className="submenu"
        >
          <List component="div">
            <ListItem
              component={Link}
              href="/fees"
              className={`menu-link ${pathname === "/fees" ? "active" : ""}`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Fees List" />
            </ListItem>
            <ListItem
              component={Link}
              href="/fees_sub"
              className={`menu-link ${
                pathname === "/fees_sub" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Add Fees Submission" />
            </ListItem>
          </List>
        </Collapse>

        {/* HRMS Menu */}
        <ListItem
          className="submenu menu-link"
          onClick={() => toggleMenu("hrms")}
        >
          <ListItemIcon>
            <SettingsAccessibilityIcon />
          </ListItemIcon>
          <ListItemText primary="HRMS" />
          {openMenus.hrms ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse
          in={openMenus.hrms}
          timeout="auto"
          unmountOnExit
          className="submenu"
        >
          <List component="div">
            <ListItem
              component={Link}
              href="/leave"
              className={`menu-link ${pathname === "/leave" ? "active" : ""}`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="All Leave List" />
            </ListItem>
            <ListItem
              component={Link}
              href="/leave-apply"
              className={`menu-link ${
                pathname === "/leave-apply" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Leave Apply" />
            </ListItem>
            <ListItem
              component={Link}
              href="/leave-user"
              className={`menu-link ${
                pathname === "/leave-user" ? "active" : ""
              }`}
              sx={{ height: "36px" }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Leave User" />
            </ListItem>
          </List>
        </Collapse>

        {/* Other Menu Items */}
        <ListItem
          component={Link}
          href="/attendance"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/attendance" ? "active" : ""}`}
        >
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>

        <ListItem
          component={Link}
          href="/transport"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/transport" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DirectionsBusIcon />
          </ListItemIcon>
          <ListItemText primary="Transport" />
        </ListItem>
        
         <ListItem
          component={Link}
          href="/subject"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/subject" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Subject" />
        </ListItem> 

         <ListItem
          component={Link}
          href="/designation"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/designation" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Designation" />
        </ListItem> 


          <ListItem
          component={Link}
          href="/holiday"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/holiday" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Holidays" />
        </ListItem> 

        <ListItem
          component={Link}
          href="/notice"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/notice" ? "active" : ""}`}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Notice" />
        </ListItem>

        <ListItem
          component={Link}
          href="/setting"
          sx={{ height: "40px" }}
          className={`menu-link ${pathname === "/setting" ? "active" : ""}`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
