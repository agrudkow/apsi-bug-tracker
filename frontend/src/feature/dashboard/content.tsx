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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Column {
  id: 'number' | 'date' | 'title' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  {
    id: 'number',
    label: 'Problem ID',
    minWidth: 152.5,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Creation date',
    minWidth: 152.5,
  },
  { id: 'title', label: 'Title', minWidth: 152.5 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 152.5,
  },
];

interface Data {
  number: number;
  date: string;
  title: string;
  status: string;
  description: string;
}

function createData(
  number: number,
  date: string,
  title: string,
  status: string,
  description: string
): Data {
  return { number, date, title, status, description };
}

const rows = [
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
  createData(
    12345,
    '20.09.2015',
    'Serwer is down',
    'new',
    'I have a lot of problems, please help me as soon as possible, love xoxo'
  ),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const buttonView = {
    px: 3,
  };

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          hover
          role="checkbox"
          sx={{ '& > *': { borderBottom: 'unset' } }}
        >
          <TableCell sx={{ py: 1 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            align="left"
            size="small"
            component="th"
            scope="row"
            sx={{ py: 1 }}
          >
            {row.number}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.date}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.title}
          </TableCell>
          <TableCell align="left" sx={{ py: 1 }}>
            {row.status}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{ mt: 2 }}
                >
                  Description
                </Typography>
                <Typography variant="body2" align="left">
                  {row.description}
                </Typography>
                <Button
                variant="contained"
                size="large"
                sx={{ ...buttonView, fontSize: 12, marginY:1, paddingX: 1, paddingY: 0.5 }}
                >
                  Go to form
                </Button>
              </Box>

            </Collapse>
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
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return <Row key={`${row.number}-${index}`} row={row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Paper>
  );
}
