"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ProtectedRoute from "../ProtectedRoute";

interface LayoutWrapper2Props {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapper2Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default desktop ke liye open

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScreen = () => {
        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        setIsSidebarOpen(isMobile); // 👈 mobile => false, desktop => true
      };

      checkScreen(); // initial check
      window.addEventListener("resize", checkScreen);

      return () => window.removeEventListener("resize", checkScreen);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
