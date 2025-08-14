'use client';
import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridPaginationModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

type DataTableProps = {
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSize?: number;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  height?: number | string;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  pageSize = 5,
  pageSizeOptions = [5, 10, 25],
  checkboxSelection = false,
  height = 400,
  onEdit,
  onDelete,
  onView,
}) => {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize,
  });

  // Add Actions column only if handlers are passed
  const extendedColumns = React.useMemo(() => {
    if (!onEdit && !onDelete && !onView) return columns;

    return [
      ...columns,
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <>
           {onView && (
              <IconButton onClick={() => onView(params.row)} color="primary" size="small">
               <VisibilityIcon fontSize="small" />
              </IconButton>
            )}
            {onEdit && (
              <IconButton onClick={() => onEdit(params.row)} color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(params.row)} color="error" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </>
        ),
      },
    ];
  }, [columns, onEdit, onDelete]);

  return (
    <Paper sx={{ height, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={extendedColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DataTable;
