import { Breakpoint, Button, Chip, Paper } from "@mui/material";
import { Container } from "@mui/system";
import "./fonts";
import { DataGrid, GridColDef, GridColTypeDef } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";

const titleColumnType: GridColTypeDef = {
  type: "string",
  flex: 1,
};

const dateColumnType: GridColTypeDef = {
  type: "date",
  width: 150,
  valueFormatter: (value: Date) => value.toDateString(),
};

const typeColumnType: GridColTypeDef = {
  type: "custom",
  width: 120,
  renderCell: ({ value }) => <Chip variant="outlined" label={value}></Chip>,
};

const tagColumnType: GridColTypeDef = {
  type: "custom",
  width: 120,
  renderCell: ({ value }) => <Chip variant="outlined" label={value}></Chip>,
};

const statusColumnType: GridColTypeDef = {
  type: "custom",
  width: 120,
  renderCell: ({ value }) => <Chip variant="outlined" label={value}></Chip>,
};

const upvoteColumnType: GridColTypeDef = {
  type: "number",
  width: 100,
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", ...titleColumnType },
  { field: "type", headerName: "Type", ...typeColumnType },
  { field: "tag", headerName: "Tag", ...tagColumnType },
  { field: "status", headerName: "Status", ...statusColumnType },
  { field: "date", headerName: "Date", ...dateColumnType },
  { field: "upvote", headerName: "Upvote", ...upvoteColumnType },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => {
      const navigate = useNavigate();
      return (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/submission/${params.row.id}`)}
        >
          View
        </Button>
      );
    },
  },
];

export interface SubmissionTableEntry {
  id: number;
  title: string;
  tag: string;
  type: string;
  status: string;
  date: Date;
  upvote: number;
}

type SubmissionTableDataGridProps = Omit<
  React.ComponentProps<typeof DataGrid>,
  "rows" | "columns"
>;

export interface SubmissionTableProps extends SubmissionTableDataGridProps {
  maxWidth?: Breakpoint | false;
  entries: SubmissionTableEntry[];
  noGutter?: boolean;
  onRowClick?: (params: any) => void;
}

export default function SubmissionTable(props: SubmissionTableProps) {
  const { maxWidth = "lg", entries, noGutter = false, onRowClick } = props;

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        mb: noGutter ? 0 : 3,
      }}
    >
      <Paper variant="outlined">
        <DataGrid
          columns={columns}
          rows={entries}
          onRowClick={onRowClick}
          {...(props as SubmissionTableDataGridProps)}
        ></DataGrid>
      </Paper>
    </Container>
  );
}
