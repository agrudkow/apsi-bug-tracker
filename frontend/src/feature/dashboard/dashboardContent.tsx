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
import { Popover } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { CircularProgress } from '@mui/material';


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
    minWidth: 120,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Creation date',
    minWidth: 120,
  },
  { id: 'type', label: 'Type', minWidth: 120 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 80,
  },
  {
    id: 'a',
    label: ' ',
    minWidth: 140,
  },
];


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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '250'
    },
  },
};

const statuses = [
  'New',
  'Assigned',
  'Analyzed',
  'Diagnosed',
  'Undiagnosed',
  'Resolved',
  'Unresolved',
];

const problems = [
    'Service',
    'Bug',
    'Incident',
];

function getStyles(name: string, statusName: string[], theme: Theme) {
  return {
    fontWeight:
      statusName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ProblemsTable() {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataRows, setDataRows] = useState<Data[]>([]);
  const navigate = useNavigate();
  const [searched, setSearched] = useState<string>("");
  const [openPopUpSubmit, setOpenPopUpSubmit] = React.useState(false);

  const [openPopUpDelete, setOpenPopUpDelete] = React.useState(false);
  const [searchedRows, setSearchedRows] = useState<Data[]>(dataRows);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const [statusName, setStatusName] = React.useState<string[]>([]);
  const [problemTypeName, setProblemTypeName] = React.useState<string[]>([]);

  const handleChangeSelectStatus = (event: SelectChangeEvent<typeof statusName>) => {
    const {
      target: { value },
    } = event;
    setStatusName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelectType = (event: SelectChangeEvent<typeof problemTypeName>) => {
    const {
      target: { value },
    } = event;
    setProblemTypeName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ident = open ? 'simple-popover' : undefined;

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const newSearchedRows = dataRows.filter((row) => {
      return row.id.toString().includes(searchedVal.toString()) || row.description.toString().includes(searchedVal.toString());
    });
    setSearchedRows(newSearchedRows);
};

const requestFilter = () => {
  var newRows: Array<boolean> = [];
  
  const newSearchedRows = dataRows.filter((row) => {  
    let isGoodRowProblemTypeName: boolean = false;
    let isGoodRowStatusName: boolean = false;
    console.log("Statusname: " + statusName)
    if (statusName.length === 0){
      isGoodRowStatusName = true;
      console.log("in status name empty")
      
    }
    console.log("Problem name: " + problemTypeName)
    if (problemTypeName.length === 0 ){
      isGoodRowProblemTypeName = true;
      console.log("problemnName empty")
    }
    for (var val of statusName){
      if(row.status.toString().includes(val.toString())){
        isGoodRowStatusName = true;
      }
    }
    for (var val of problemTypeName){
      if(row.type.toString().includes(val.toString())){
        isGoodRowProblemTypeName = true;
      }
    }
    return isGoodRowProblemTypeName && isGoodRowStatusName;
  });
  
  setSearchedRows(newSearchedRows);
};

const cancelSearch = () => {
  setSearched("");
  setSearchedRows(dataRows);
};

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
    navigate(`../${Routes.ProblemEditForm}/${localStorage.getItem('username')}/${problem_id}`, { replace: true });
  };

  const buttonView = {
    px: 3,
  };


  const fetchProblemsData = async () => {
    
    let xd = (await apsi_backend.get<Data[]>(BackendRoutes.Problems+'/'+localStorage.getItem('username'))).data;
    setDataRows(xd);
    setSearchedRows(xd);
    setLoading(false);
  }
    

  useEffect(() => {
    
    fetchProblemsData();
    
    if (localStorage.getItem('isProblemSubmitted')==='true')
    {
      setOpenPopUpSubmit(true);
      localStorage.setItem('isProblemSubmitted', 'false');
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
                value={searched}
                placeholder="Search by problem ID or keywords"
                onChange={(event) =>  requestSearch(event.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Tooltip title="Reload">
                <IconButton onClick={cancelSearch}>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
            <Button aria-describedby={ident} variant="contained" onClick={handleClick}>
            <FilterListIcon/>
      </Button>
      <Popover
        id={ident}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
            <div>
            <Typography sx={{ m: 1, pt: 1, pl: 0.5}} variant="subtitle1" component="div">
        Filter
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        
        <InputLabel id="statuses">Status</InputLabel>
        <Select
          labelId="statuses"
          id="statuses"
          multiple
          value={statusName}
          onChange={handleChangeSelectStatus}
          input={<OutlinedInput id="select-statuses" label="Statuses" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {statuses.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, statusName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </div>
        <div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="Problem_type">Problem type</InputLabel>
        <Select
          labelId="Problem_type"
          id="Problem_type"
          multiple
          value={problemTypeName}
          onChange={handleChangeSelectType}
          input={<OutlinedInput id="select-types" label="Problem types" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {problems.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, statusName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

    <Button
                  variant="contained"
                  size="large"
                  sx={{
                    ...buttonView,
                    fontSize: 12,
                    margin: 1,
                    paddingX: 1,
                    paddingY: 0.5,
                  }}
                  onClick={requestFilter}
                >
                  Apply
                </Button>
                </div>
      </Popover>
      </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(loading===true) && (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <CircularProgress />
      </div>
      )}
    {loading===false &&(
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
              {searchedRows
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
          count={searchedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>)}
      <Snackbar open={openPopUpSubmit} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpSubmit}>
        <Alert onClose={handleClosePopUpSubmit} severity="success" sx={{ width: '100%' }}>
          Problem has been submitted!
        </Alert>
      </Snackbar>

      <Snackbar open={openPopUpDelete} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpDelete}>
        <Alert onClose={handleClosePopUpDelete} severity="success" sx={{ width: '100%' }}>
          Problem has been deleted!
        </Alert>
      </Snackbar>
    </Paper>

  );

}
