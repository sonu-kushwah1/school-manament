import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
];

const rows = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
];

export default function BoldHeaderDataGrid() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "800", // Makes headers bold
            fontSize: "1rem",
          },
        }}
      />
    </div>
  );
}
