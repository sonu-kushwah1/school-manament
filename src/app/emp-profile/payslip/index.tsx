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
import EditIcon from "@mui/icons-material/Edit";
import SimpleDialog from "@/component/modal";
import CustomButton from "@/component/button";
import BasicInput from "@/component/custom-input";

interface BankForm {
  bankName: string;
  accountNo: string;
  ifscCode: string;
  branchAdd: string;
}

interface BankDisplayItem {
  label: string;
  value: string;
}

const PaySlip = () => {
  const [open, setOpen] = useState(false);

  const [emp, setEmp] = useState<BankForm>({
    bankName: "",
    accountNo: "",
    ifscCode: "",
    branchAdd: "",
  });

  const [bankData, setBankData] = useState<BankDisplayItem[]>([]);

  // Fetch bank details for display
  const fetchBankData = () => {
    fetch("http://localhost:3001/emp_bank_details/1")
      .then((res) => res.json())
      .then((data) => {
        setBankData([
          { label: "Bank Name", value: data.bank_name || "" },
          { label: "Account Number", value: data.account_number || "" },
          { label: "IFSC Code", value: data.ifsc || "" },
          { label: "Branch Address", value: data.branch_address || "" },
        ]);
      })
      .catch((err) => console.error("Failed to fetch display data:", err));
  };

  useEffect(() => {
    fetchBankData();
  }, []);

  // Fetch for form when edit is clicked
  const handleEditClick = () => {
    fetch("http://localhost:3001/emp_bank_details/1")
      .then((res) => res.json())
      .then((data) => {
        setEmp({
          bankName: data.bank_name || "",
          accountNo: data.account_number || "",
          ifscCode: data.ifsc || "",
          branchAdd: data.branch_address || "",
        });
        setOpen(true);
      })
      .catch((err) => console.error("Failed to fetch form data:", err));
  };

  const empChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update bank details
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      bank_name: emp.bankName,
      account_number: emp.accountNo,
      ifsc: emp.ifscCode,
      branch_address: emp.branchAdd,
    };

    fetch("http://localhost:3001/emp_bank_details/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchBankData(); // refresh display
        setOpen(false); // close modal
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div>
      {/* Modal */}
      <SimpleDialog open={open} onClose={() => setOpen(false)} title="Bank Details">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <BasicInput
                label="Bank Name*"
                inputType="text"
                name="bankName"
                value={emp.bankName}
                onChange={empChange}
              />
            </Grid>
            <Grid size={12}>
              <BasicInput
                label="Account No*"
                inputType="text"
                name="accountNo"
                value={emp.accountNo}
                onChange={empChange}
              />
            </Grid>
            <Grid size={12}>
              <BasicInput
                label="IFSC Code*"
                inputType="text"
                name="ifscCode"
                value={emp.ifscCode}
                onChange={empChange}
              />
            </Grid>
            <Grid size={12}>
              <BasicInput
                label="Branch Address"
                inputType="text"
                name="branchAdd"
                value={emp.branchAdd}
                onChange={empChange}
              />
            </Grid>
            <Grid size={12} textAlign="center">
              <CustomButton type="submit" label="Submit" />
            </Grid>
          </Grid>
        </form>
      </SimpleDialog>

      {/* Bank Details Display */}
      <Paper sx={{ padding: "15px", borderRadius: "15px", marginBottom: "30px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <AccountCircleIcon />
            <Typography variant="h6">Payslip</Typography>
          </Stack>
          <IconButton color="success" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
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
