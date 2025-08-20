"use client";
import React, { useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Divider,
} from "@mui/material";
import html2pdf from "html2pdf.js";

const FeeReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (receiptRef.current) {
      const opt = {
        margin: 0.5,
        filename: "fee-receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
    //   html2pdf().set(opt).from(receiptRef.current).save();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Paper
        ref={receiptRef}
        elevation={3}
        sx={{ width: "800px", p: 3, bgcolor: "#fff" }}
      >
        {/* Header */}
        <Box textAlign="center" borderBottom="1px solid #ccc" pb={1}>
          <Typography variant="h6" fontWeight="bold">
            Delhi Public School
          </Typography>
          <Typography variant="body2">
            Site No.1, Sector-45, Urban Estate, Gurgaon, Haryana
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mt: 1, textDecoration: "underline" }}
          >
            FEE RECEIPT
          </Typography>
        </Box>

        {/* Details */}
        <Grid container spacing={1} mt={1}>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Receipt No:</b> 43358
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Date:</b> 14/07/2016
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Adm No:</b> 140516
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Session:</b> 2016-2017
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Name:</b> SAMARTH SHARMA BHARDWAJ
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Class:</b> 6 - B
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Installment:</b> JULY-SEP
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Counter No:</b> DPS-RECEIPT
            </Typography>
          </Grid>
        </Grid>

        {/* Table */}
        <Table sx={{ mt: 2 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell>Sl.No</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Due</TableCell>
              <TableCell align="right">Con</TableCell>
              <TableCell align="right">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Admission Fee</TableCell>
              <TableCell align="right">65000</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">65000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Tuition Fee</TableCell>
              <TableCell align="right">19140</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">19140</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Caution Money</TableCell>
              <TableCell align="right">60000</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">60000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>Annual Charges</TableCell>
              <TableCell align="right">23320</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">23320</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>Bus Fee</TableCell>
              <TableCell align="right">10360</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">10360</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Payment Info */}
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle1"
          textAlign="center"
          fontWeight="bold"
          sx={{ textDecoration: "underline" }}
        >
          PAY MODE INFORMATION
        </Typography>

        <Grid container spacing={1} mt={1}>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Pay Mode:</b> Cheque
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Date:</b> 15/07/2016
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Bank:</b> HDFC BANK
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">
              <b>Number:</b> 689870,06,07
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body1"
          fontWeight="bold"
          textAlign="right"
          mt={2}
        >
          Total: 177820
        </Typography>
      </Paper>

      {/* Download Button */}
      <Button
        onClick={downloadPDF}
        variant="contained"
        sx={{ mt: 3 }}
      >
        Download PDF
      </Button>
    </Box>
  );
};

export default FeeReceipt;
