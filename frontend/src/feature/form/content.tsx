import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { display } from '@mui/system';
import Button from '@mui/material/Button';

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

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(event.target.value);
  };

  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrgency(event.target.value);
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
        defaultValue = ""
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
        defaultValue = ""
        helperText="Add name of product related to the problem"
      />  
              <TextField
        id="component"
        label="Component"
        defaultValue = ""
        helperText="Add name of product's component related to the problem"
      />
        <TextField
        id="version"
        label="Version"
        defaultValue = ""
        placeholder='X.X'
        helperText="Add version of product or its component related to the problem"
      />
        </div>
}
        <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
        required
        id="keywords"
        label="Keywords"
        defaultValue = ""
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
        defaultValue = ""
        helperText="Add related problems by problem ID "
      />
        <TextField
        id="Deadline"
        label="Deadline"
        defaultValue = ""
        helperText="DD.MM.YYYY"
      />
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <Button
            variant="contained"
            size="medium"
            sx={{fontSize: 20, margin: 0.5, padding: 1, width: "20%" }}
          >
            Submit
          </Button>
      </div>
      </Box>
    );
  }