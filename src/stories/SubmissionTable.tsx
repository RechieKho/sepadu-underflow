import { Breakpoint, Chip, Paper } from "@mui/material";
import { Container } from "@mui/system";
import "./fonts";
import { DataGrid, GridColDef, GridColTypeDef } from "@mui/x-data-grid";

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

export interface SubmissionTableProps {
  maxWidth?: Breakpoint | false;
  entries: SubmissionTableEntry[];
}

export default function SubmissionTable({
  maxWidth = "lg",
  entries,
}: SubmissionTableProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Paper variant="outlined">
        <DataGrid columns={columns} rows={entries}></DataGrid>
      </Paper>
    </Container>
  );
}
