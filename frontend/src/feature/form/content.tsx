import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { display } from '@mui/system';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import plLocale from 'date-fns/locale/pl';


const problems = [
  {
    value: 'S',
    label: 'Service',
  },
  {
    value: 'B',
    label: 'Bug',
  },
  {
    value: 'I',
    label: 'Incident',
  },
];

const weights = [
  {
    value: 'M',
    label: 'Minor'
  },
  {
    value: 'N',
    label: 'Normal'
  },
  {
    value: 'S',
    label: 'Significant'
  },
  {
    value: 'B',
    label: 'Blocking'
  },
  {
    value: 'C',
    label: 'Critical',
  },
];

const urgencies = [
  {
    value: '1',
    label: '1 - very urgent',
  },
  {
    value: '2',
    label: '2 - urgent',
  },
  {
    value: '3',
    label: '3 - moderatly urgent',
  },
  {
    value: '4',
    label: '4 - not too urgent',
  },
  {
    value: '5',
    label: '5 - not urgent',
  }
];


export default function FormPropsTextFields() {
  const [problem, setProblem] = React.useState('');
  const [urgency, setUrgency] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [resp_person, setResponsiblePerson] = React.useState('');
  const [date_value, setDateValue] = React.useState<Date | null>(null);
  const [observers, setObservers] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [status, setStatus] = React.useState('New');
  const [related_problems, setRelatedProblems] = React.useState('');
  const [product, setProduct] = React.useState('');
  const [component, setComponent] = React.useState('');
  const [version, setVersion] = React.useState('')

  const handleChangeObservers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setObservers(event.target.value);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleChangeRelProblems = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRelatedProblems(event.target.value);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(event.target.value);

    if (event.target.value ==='app' && problem === 'B'){
      setResponsiblePerson("Jeff Bezos");
   }
   else {
    setResponsiblePerson('');
 }
  };

  const handleChangeComponent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComponent(event.target.value);
    if (event.target.value ==='interface' && product === 'sys'){
      setResponsiblePerson("Steve Jobs");
   }
   else if (event.target.value ==='database' && product === 'sys'){
    setResponsiblePerson("Andrzej Duda");
   }
   else {
    setResponsiblePerson('');
 }

  };

  const handleChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(event.target.value);
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(event.target.value);
    if (event.target.value ==='S'){
        setResponsiblePerson("Bill Gates");
    }
    else if (event.target.value ==='I'){
      setResponsiblePerson("Elon Musk");
   }
   else if (event.target.value ==='B'){
    setResponsiblePerson("");
 };

  };

  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrgency(event.target.value);
  };

  const handleChangeRespPerson = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponsiblePerson(event.target.value);
  };

    return (
      <Box
        component="form"
        
        sx = {{ '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
      <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
          required
          disabled
          id="Username"
          label="Username"
          defaultValue="Jan"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
        id="Observers"
        label="Observers"
        multiline
        value={observers}
        onChange={handleChangeObservers}
        helperText="Add problem observers by username"
      />
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
          required
          id="problem_type"
          select
          label="Problem type"
          value={problem}
          onChange={handleChangeProblem}
        >
          {problems.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="weight"
          select
          label="Weight"
          value={weight}
          onChange={handleChangeWeight}
        >
          {weights.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          required
          id="urgency"
          select
          label="Urgency"
          value={urgency}
          onChange={handleChangeUrgency}
        >
          {urgencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        {problem === "B" &&
        <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
        required
        id="product" 
        label="Product"
        value={product}
        onChange={handleChangeProduct}
        helperText="Add name of product related to the problem"
      />  
              <TextField
        id="component"
        label="Component"
        value={component}
        onChange={handleChangeComponent}
        helperText="Add name of product's component related to the problem"
      />
        <TextField
        id="version"
        label="Version"
        value={version}
        onChange={handleChangeVersion}
        placeholder='X.X'
        helperText="Add version of product or its component related to the problem"
      />
        </div>}
        <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
        required
        id="keywords"
        label="Keywords"
        value={keywords}
        onChange={handleChangeKeywords}
        helperText="Name problem keywords using comma"
      />
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
      <TextField
        required
        id="description"
        label="Description"
        multiline
        rows={6}
        value={description}
        onChange={handleChangeDescription}
      />
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
        id="related_problems"
        label="Related problems"
        value={related_problems}
        onChange={handleChangeRelProblems}
        helperText="Add related problems by problem ID "
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
        <DatePicker
          disablePast
          label="Proposed deadline"
          openTo="year"
          mask='__.__.____'
          views={['day']}
          value = {date_value}
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
          renderInput={(params) => <TextField  helperText='dd.mm.yyyy' {...params}  />}
        />
        </LocalizationProvider>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
          required
          disabled
          id="status"
          label="Status"
          value={status}
          onChange={handleChangeStatus}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
         required
         disabled
         id="responsible_person"
         label="Responsible person"
         value={resp_person}
        onChange={handleChangeRespPerson}
         InputProps={{
           readOnly: true,
         }}
      />
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <Button
            variant="contained"
            size="medium"
            sx={{fontSize: 20, margin: 0.5, marginTop: 3, padding: 1, width: "20%" }}
          >
            Submit
          </Button>
      </div>
      </Box>
    );
  }