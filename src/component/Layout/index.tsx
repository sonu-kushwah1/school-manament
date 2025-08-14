"use client";
import React, { ReactNode,useState,useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Only run this in the browser
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        setIsSidebarOpen(true);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen}  />
      <div className={`mainPage ${isSidebarOpen ? "mainPageAdd" : ""}`}>
        {children}
      </div>
      <Footer></Footer>
    </Box>
  );
};

export default LayoutWrapper;
