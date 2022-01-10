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
    username: '',
    observers: '',
    problemType: '',
    weight: '',
    urgency: '',
    product: '',
    component: '',
    version: '',
    keywords: '',
    description: '',
    relatedProblems: '',
    proposedDeadline: null,
    status: 'New',
    responsiblePerson: '',
  });

  useEffect(() => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.username = localStorage.getItem('username');
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
    newProblemData.username = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeObservers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.observers = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.keywords = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.status = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRelProblems = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.relatedProblems = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.product = event.target.value;

    if (
      event.target.value === 'SmartPet' &&
      problemData.problemType === 'Bug'
    ) {
      newProblemData.responsiblePerson = 'Jeff Bezos';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.problemType === 'Bug' &&
      problemData.component === 'Interface'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.problemType === 'Bug' &&
      problemData.component === 'Database'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    } else {
      newProblemData.responsiblePerson = '';
    }

    setProblemData(newProblemData);
  };

  const handleChangeComponent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.component = event.target.value;
    if (
      event.target.value === 'Interface' &&
      problemData.product === 'PetApp'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      event.target.value === 'Database' &&
      problemData.product === 'PetApp'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    } else {
      newProblemData.responsiblePerson = '';
    }
    setProblemData(newProblemData);
  };

  const handleChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.version = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.description = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.problemType = event.target.value;
    if (event.target.value === 'Service') {
      newProblemData.responsiblePerson = 'Bill Gates';
    } else if (event.target.value === 'Incident') {
      newProblemData.responsiblePerson = 'Elon Musk';
    } else if (event.target.value === 'Bug') {
      newProblemData.responsiblePerson = '';
    }
    if (problemData.product === 'SmartPet' && event.target.value === 'Bug') {
      newProblemData.responsiblePerson = 'Jeff Bezos';
    } else if (
      problemData.product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.component === 'Interface'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      problemData.product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.component === 'Database'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    }
    setProblemData(newProblemData);
  };

  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.weight = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.urgency = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRespPerson = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: NewProblemData = { ...problemData };
    newProblemData.responsiblePerson = event.target.value;
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
          value={problemData.username}
          onChange={handleChangeUser}
        />
        <TextField
          id="Observers"
          label="Observers"
          multiline
          value={problemData.observers}
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
          value={problemData.problemType}
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
          value={problemData.weight}
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
          value={problemData.urgency}
          onChange={handleChangeUrgency}
        >
          {urgencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {problemData.problemType === 'Bug' && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            required
            select
            id="product"
            label="Product"
            value={problemData.product}
            onChange={handleChangeProduct}
          >
            {products.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {problemData.product === 'PetApp' && (
            <TextField
              select
              required
              id="component"
              label="Component"
              value={problemData.component}
              onChange={handleChangeComponent}
            >
              {components.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {problemData.product === 'SmartPet' && (
            <TextField
              id="version"
              required
              label="Version"
              value={problemData.version}
              onChange={handleChangeVersion}
              placeholder="X.X.X"
              helperText="Add version of product related to the problem"
            />
          )}

          {problemData.product === 'PetApp' && (
            <TextField
              id="version"
              required
              label="Version"
              value={problemData.version}
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
          value={problemData.keywords}
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
          value={problemData.description}
          onChange={handleChangeDescription}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="related_problems"
          label="Related problems"
          value={problemData.relatedProblems}
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
            value={problemData.proposedDeadline}
            onChange={(newValue) => {
              const newProblemData: NewProblemData = { ...problemData };
              if (newValue) newProblemData.proposedDeadline = newValue;
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
          value={problemData.status}
          onChange={handleChangeStatus}
        />

        <TextField
          required
          disabled
          id="responsible_person"
          label="Responsible person"
          value={problemData.responsiblePerson}
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
