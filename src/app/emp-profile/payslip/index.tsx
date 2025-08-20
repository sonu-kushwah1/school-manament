import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
  Stack
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface BankDisplayItem {
  label: string;
  value: string | number;
}

const PaySlip = () => {
  const [bankData, setBankData] = useState<BankDisplayItem[]>([]);

  // Fetch bank details for display only
  const fetchBankData = () => {
    fetch("http://localhost:3001/emp_list_test/1")
      .then((res) => res.json())
      .then((data) => {
        // Convert salary to number
        const basicSalary = Number(data.bank_name) || 0;

        // ✅ Example PF Amount calculation (10% of Basic Salary)
        const pfAmount = (basicSalary * 0.1).toFixed(2);

        setBankData([
          { label: "Basic Salary", value: data.bank_name || "" },
          { label: "PF", value: data.account_number || "" },
          { label: "PF Amount", value: pfAmount }, // calculated
          { label: "Net Salary", value: data.branch_address || "" },
        ]);
      })
      .catch((err) => console.error("Failed to fetch display data:", err));
  };

  useEffect(() => {
    fetchBankData();
  }, []);

  return (
    <div>
      {/* Bank Details Display */}
      <Paper sx={{ padding: "15px", borderRadius: "15px", marginBottom: "30px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <AccountCircleIcon />
            <Typography variant="h6">Payslip</Typography>
          </Stack>
        </Stack>
        <Box>
          <Stack spacing={1.5}>
            {bankData.map((item, index) => (
              <React.Fragment key={index}>
                <Grid container>
                  <Grid size={6}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body2" color="text.primary">
                      {item.value}
                    </Typography>
                  </Grid>
                </Grid>
                {index !== bankData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      </Paper>
    </div>
  );
};

export default PaySlip;
