"use client";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import LayoutWrapper from "@/component/Layout";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/setting_list";

const Holiday: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setFiles(res.data);
    });
  }, []);

  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Holidays" currentPage="Holidays" />
        <Box className="customBox" p={2}>
          {files.length > 0 ? (
            files.map((file) => {
              // if API only returns filename (e.g., "Holiday2025.pdf"),
              // build full URL from backend
              const pdfUrl = file.holiday.startsWith("http")
                ? file.holiday
                : `http://localhost:3001/${file.holiday}`;

              return (
                <Box
                  key={file.id}
                  mb={4}
                  p={2}
                  border="1px solid #ddd"
                  borderRadius="8px"
                >
                  <Typography variant="h6" mb={1}>
                    {file.holiday}
                  </Typography>

                  {/* Embedded PDF viewer */}
                  <iframe
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                    style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                  />

                  {/* Download link */}
                  <Box mt={1}>
                    <a
                      href={pdfUrl}
                      download
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Download PDF
                    </a>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography>No holiday PDFs found.</Typography>
          )}
        </Box>
      </LayoutWrapper>
    </div>
  );
};

export default Holiday;
