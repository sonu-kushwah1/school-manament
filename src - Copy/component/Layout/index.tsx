"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ProtectedRoute from "../ProtectedRoute";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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
    <ProtectedRoute>
      <Box>
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`mainPage ${isSidebarOpen ? "mainPageAdd" : ""}`}>
          {children}
        </div>
        <Footer />
      </Box>
    </ProtectedRoute>
  );
};

export default LayoutWrapper;
