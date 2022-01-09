import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import plLocale from 'date-fns/locale/pl';
import { useEffect } from 'react';
import { NewProblemData } from '../../interface';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../utils';

const problems = [
  {
    value: 'Service',
    label: 'Service',
  },
  {
    value: 'Bug',
    label: 'Bug',
  },
  {
    value: 'Incident',
    label: 'Incident',
  },
];

const weights = [
  {
    value: 'Minor',
    label: 'Minor',
  },
  {
    value: 'Normal',
    label: 'Normal',
  },
  {
    value: 'Significant',
    label: 'Significant',
  },
  {
    value: 'Blocking',
    label: 'Blocking',
  },
  {
    value: 'Critical',
    label: 'Critical',
  },
];

const urgencies = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

const products = [
  {
    value: 'PetApp',
    label: 'PetApp',
  },
  {
    value: 'SmartPet',
    label: 'SmartPet',
  },
];

const components = [
  {
    value: 'Interface',
    label: 'Interface',
  },
  {
    value: 'Database',
    label: 'Database',
  },
];

export function NewFormContent() {
  const [problemData, setProblemData] = React.useState<NewProblemData>({
    Username: '',
    Observers: '',
    Problem_type: '',
    Weight: '',
    Urgency: '',
    Product: '',
    Component: '',
    Version: '',
    Keywords: '',
    Description: '',
    Related_problems: '',
    Proposed_deadline: null,
    Status: 'New',
    Responsible_person: '',
  });

  useEffect(() => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Username = localStorage.getItem('username');
    setProblemData(newProblemData);
  }, []);

  const sendData = async () => {
    // TODO: await axios
    // .post("backend.pl/data", problemData)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: sendData();
    console.log('aaaa');
    navigate(`../${Routes.Dashboard}`, { replace: true });
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Username = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeObservers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Observers = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Keywords = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Status = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRelProblems = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Related_problems = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Product = event.target.value;

    if (
      event.target.value === 'SmartPet' &&
      problemData.Problem_type === 'Bug'
    ) {
      newProblemData.Responsible_person = 'Jeff Bezos';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.Problem_type === 'Bug' &&
      problemData.Component === 'Interface'
    ) {
      newProblemData.Responsible_person = 'Steve Jobs';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.Problem_type === 'Bug' &&
      problemData.Component === 'Database'
    ) {
      newProblemData.Responsible_person = 'Andrzej Duda';
    } else {
      newProblemData.Responsible_person = '';
    }

    setProblemData(newProblemData);
  };

  const handleChangeComponent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Component = event.target.value;
    if (
      event.target.value === 'Interface' &&
      problemData.Product === 'PetApp'
    ) {
      newProblemData.Responsible_person = 'Steve Jobs';
    } else if (
      event.target.value === 'Database' &&
      problemData.Product === 'PetApp'
    ) {
      newProblemData.Responsible_person = 'Andrzej Duda';
    } else {
      newProblemData.Responsible_person = '';
    }
    setProblemData(newProblemData);
  };

  const handleChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Version = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Description = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Problem_type = event.target.value;
    if (event.target.value === 'Service') {
      newProblemData.Responsible_person = 'Bill Gates';
    } else if (event.target.value === 'Incident') {
      newProblemData.Responsible_person = 'Elon Musk';
    } else if (event.target.value === 'Bug') {
      newProblemData.Responsible_person = '';
    }
    if (problemData.Product === 'SmartPet' && event.target.value === 'Bug') {
      newProblemData.Responsible_person = 'Jeff Bezos';
    } else if (
      problemData.Product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.Component === 'Interface'
    ) {
      newProblemData.Responsible_person = 'Steve Jobs';
    } else if (
      problemData.Product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.Component === 'Database'
    ) {
      newProblemData.Responsible_person = 'Andrzej Duda';
    }
    setProblemData(newProblemData);
  };

  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Weight = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Urgency = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRespPerson = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.Responsible_person = event.target.value;
    setProblemData(newProblemData);
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      onSubmit={handleSubmit}
      //autoComplete="off"
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled
          id="Username"
          label="Username"
          value={problemData.Username}
          onChange={handleChangeUser}
        />
        <TextField
          id="Observers"
          label="Observers"
          multiline
          value={problemData.Observers}
          onChange={handleChangeObservers}
          helperText="Add problem observers by username"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          id="problem_type"
          select
          label="Problem type"
          value={problemData.Problem_type}
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
          value={problemData.Weight}
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
          helperText="Select 1 if not urgent or 5 if highly urgent"
          value={problemData.Urgency}
          onChange={handleChangeUrgency}
        >
          {urgencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {problemData.Problem_type === 'Bug' && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            required
            select
            id="product"
            label="Product"
            value={problemData.Product}
            onChange={handleChangeProduct}
          >
            {products.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {problemData.Product === 'PetApp' && (
            <TextField
              select
              required
              id="component"
              label="Component"
              value={problemData.Component}
              onChange={handleChangeComponent}
            >
              {components.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {problemData.Product === 'SmartPet' && (
            <TextField
              id="version"
              required
              label="Version"
              value={problemData.Version}
              onChange={handleChangeVersion}
              placeholder="X.X.X"
              helperText="Add version of product related to the problem"
            />
          )}

          {problemData.Product === 'PetApp' && (
            <TextField
              id="version"
              required
              label="Version"
              value={problemData.Version}
              onChange={handleChangeVersion}
              placeholder="X.X.X"
              helperText="Add version of product's component related to the problem"
            />
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          id="keywords"
          label="Keywords"
          value={problemData.Keywords}
          onChange={handleChangeKeywords}
          helperText="Name problem keywords using comma"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          id="description"
          label="Description"
          multiline
          rows={6}
          value={problemData.Description}
          onChange={handleChangeDescription}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="related_problems"
          label="Related problems"
          value={problemData.Related_problems}
          onChange={handleChangeRelProblems}
          helperText="Add related problems by problem ID "
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <DatePicker
            disablePast
            label="Proposed deadline"
            openTo="year"
            mask="__.__.____"
            views={['day']}
            value={problemData.Proposed_deadline}
            onChange={(newValue) => {
              const newProblemData: NewProblemData = { ...problemData };
              if (newValue) newProblemData.Proposed_deadline = newValue;
              setProblemData(newProblemData);
            }}
            renderInput={(params) => (
              <TextField helperText="dd.mm.yyyy" {...params} />
            )}
          />
        </LocalizationProvider>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled
          id="status"
          label="Status"
          value={problemData.Status}
          onChange={handleChangeStatus}
        />

        <TextField
          required
          disabled
          id="responsible_person"
          label="Responsible person"
          value={problemData.Responsible_person}
          onChange={handleChangeRespPerson}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          type="submit"
          size="medium"
          sx={{
            fontSize: 20,
            margin: 0.5,
            marginTop: 3,
            padding: 1,
            width: '20%',
          }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
