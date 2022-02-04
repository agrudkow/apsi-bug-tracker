import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BackendRoutes, Routes } from '../../utils';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { apsi_backend } from '../common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import MUIDataTable from "mui-datatables";

interface Column {
  id: 'number' | 'date' | 'type' | 'status' | 'description' | 'a';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'number',
    label: 'Problem ID',
    minWidth: 20,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Creation date',
    minWidth: 40,
  },
  { id: 'type', label: 'Type', minWidth: 152.5 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 20,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 80,
  },
  {
    id: 'a',
    label: ' ',
    minWidth: 80,
  },
];
// const columns = [
//   {
//    name: "number",
//    label: "Number",
//    options: {
//     filter: true,
//     sort: true,
//    }
//   },
//   {
//    name: "date",
//    label: "Creation date",
//    options: {
//     filter: true,
//     sort: true,
//    }
//   },
//   {
//    name: "type",
//    label: "Problem type",
//    options: {
//     filter: true,
//     sort: true,
//    }
//   },
//   {
//    name: "status",
//    label: "Status",
//    options: {
//     filter: true,
//     sort: true,
//    }
//   },
//   {
//     name: "description",
//     label: "Description",
//     options: {
//      filter: true,
//      sort: true,
//     }
//    },
//  ];

interface Data {
  id: number;
  date: string;
  type: string;
  status: string;
  description: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProblemsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [searched, setSearched] = useState<string>("");
  const [openPopUpSubmit, setOpenPopUpSubmit] = React.useState(false);
  const [openPopUpUpdate, setOpenPopUpUpdate] = React.useState(false);
  const [openPopUpDelete, setOpenPopUpDelete] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const problemDetailsHandlerFactory = (problem_id: number) => () => {
    navigate(`../${Routes.ProblemEditForm}/${problem_id}`, { replace: true });
  };

  const buttonView = {
    px: 3,
  };

  const [dataRows, setDataRows] = useState<Data[]>([]);

  const fetchProblemsData = async () =>
    setDataRows((await apsi_backend.get<Data[]>(BackendRoutes.Problems)).data);

  useEffect(() => {
    fetchProblemsData();
    if (localStorage.getItem('isProblemSubmitted')==='true')
    {
      setOpenPopUpSubmit(true);
      localStorage.setItem('isProblemSubmitted', 'false');
    }
    if (localStorage.getItem('isProblemUpdated')==='true')
    {
      setOpenPopUpUpdate(true);
      localStorage.setItem('isProblemUpdated', 'false');
    }
    if (localStorage.getItem('isProblemDeleted')==='true')
    {
      setOpenPopUpDelete(true);
      localStorage.setItem('isProblemDeleted', 'false');
    }
  }, []);

  const handleClosePopUpSubmit = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPopUpSubmit(false);
  };

  const handleClosePopUpUpdate = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPopUpUpdate(false);
  };

  const handleClosePopUpDelete = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPopUpDelete(false);
  };

  function Row(props: { row: Data }) {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow
          hover
          role="checkbox"
          sx={{ '& > *': { borderBottom: 'unset' } }}
        >
        
          <TableCell
            align="left"
            size="small"
            component="th"
            scope="row"
            sx={{ py: 1 }}
          >
            {row.id}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.date}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.type}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.status}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.description}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
          <Button
                  variant="contained"
                  size="large"
                  sx={{
                    ...buttonView,
                    fontSize: 12,
                    marginY: 1,
                    paddingX: 1,
                    paddingY: 0.5,
                  }}
                  onClick={problemDetailsHandlerFactory(row.id)}
                >
                  Go to details
                </Button>
                </TableCell>
        </TableRow>
        
      </React.Fragment>
    );
  }

  return (
    
    <Paper sx={{ maxWidth: 'lg', margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by problem ID, keywords"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Search
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return <Row key={`${row.id}-${index}`} row={row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar open={openPopUpSubmit} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpSubmit}>
        <Alert onClose={handleClosePopUpSubmit} severity="success" sx={{ width: '100%' }}>
          Problem has been submitted!
        </Alert>
      </Snackbar>
      <Snackbar open={openPopUpUpdate} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpUpdate}>
        <Alert onClose={handleClosePopUpUpdate} severity="success" sx={{ width: '100%' }}>
          Problem has been updated!
        </Alert>
      </Snackbar>
      <Snackbar open={openPopUpDelete} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpDelete}>
        <Alert onClose={handleClosePopUpDelete} severity="success" sx={{ width: '100%' }}>
          Problem has been deleted!
        </Alert>
      </Snackbar>
    </Paper>
//   <MUIDataTable
//   title={"Problems"}
//   data={dataRows}
//   columns={columns}
// />
  );

}
