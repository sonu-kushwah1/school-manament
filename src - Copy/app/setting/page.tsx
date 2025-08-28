"use client";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/component/Layout";
import { Typography, Grid, Box } from "@mui/material";
import BasicBreadcrumbs from "@/component/BreadCrumb";
import BasicInput from "@/component/custom-input";
import CustomButton from "@/component/button";
import axios from "axios";
import { toast } from "react-toastify";


const API_URL = "http://localhost:3001/setting_list";

const Setting: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null); // store single record

  // Fetch existing uploaded file (if any)
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      if (res.data.length > 0) {
        setUploadedFile(res.data[0]); // assuming only 1 record
      }
    });
  }, []);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload PDF
  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a PDF file!");
      return;
    }

    try {
      const res = await axios.post(API_URL, { holiday: file.name });
      setUploadedFile(res.data);
      toast.success("PDF uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    }
  };

  // Delete PDF
  const handleDelete = async () => {
    if (!uploadedFile) {
      toast.warning("No file to delete!");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${uploadedFile.id}`);
      setUploadedFile(null);
      toast.success("PDF deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  return (
    <div>
      <LayoutWrapper>
        <BasicBreadcrumbs heading="Setting" currentPage="Setting" />
        <Box className="customBox">
          <Grid container spacing={2} alignItems="center">
            <Grid size={4}>
              <BasicInput
                label="Holiday Calendar (Upload PDF)"
                inputType="file"
                name="holiday"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid size={2}>
              <CustomButton
                type="button"
                className="mainBtn"
                label="Upload"
                onClick={handleUpload}
              />
            </Grid>
            <Grid size={2}>
              <CustomButton
                type="button"
                className="mainBtn lightBtn"
                label="Delete"
                onClick={handleDelete}
              />
            </Grid>
          </Grid>

          {uploadedFile && (
            <Box mt={3}>
              <Typography variant="body1">
                Uploaded File:{" "}
                <a href={`/${uploadedFile.holiday}`} target="_blank">
                  {uploadedFile.holiday}
                </a>
              </Typography>
            </Box>
          )}
        </Box>
      </LayoutWrapper>
    </div>
  );
};

export default Setting;
