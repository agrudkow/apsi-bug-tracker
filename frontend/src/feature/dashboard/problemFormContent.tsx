import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import plLocale from 'date-fns/locale/pl';
import { Roles } from '../../interface/enums';
import { useEffect } from 'react';
import { ProblemData } from '../../interface';
import { BackendRoutes, Routes } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { apsi_backend } from '../common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    value: 'High',
    label: 'High',
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

const statuses = [
  {
    value: 'New',
    label: 'New',
  },
  {
    value: 'Assigned',
    label: 'Assigned',
  },
  {
    value: 'Analyzed',
    label: 'Analyzed',
  },
  {
    value: 'Diagnosed',
    label: 'Diagnosed',
  },
  {
    value: 'Undiagnosed',
    label: 'Undiagnosed',
  },
  {
    value: 'Resolved',
    label: 'Resolved',
  },
  {
    value: 'Unresolved',
    label: 'Unresolved',
  },
];

interface Props {
  role: string;
}

export const ProblemFormContent: React.FC<Props> = ({ role }) => {
  const [loading, setLoading] = React.useState(true);
  const [openPopUpUpdate, setOpenPopUpUpdate] = React.useState(false);
  const [newComment, setNewComment] = React.useState<string>('');
  const [disabledFieldsForUserIfNotNewStatuses, setDisabledFieldsForUserIfNotNewStatuses] = React.useState<boolean>(true);
  const [problemData, setProblemData] = React.useState<ProblemData>({
    problemID: 1,
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
    status: '',
    responsiblePerson: '',
    comments: []
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const prepareCommentToView = () => {
    let s = '';
    for (let comment of problemData.comments){
    s  = s + comment + '\n' +'____________________________________________________________________________________________' + '\n';
    }
    return s;
  }

  const fetchProblemData = async () =>{
    const newData = (await apsi_backend.get<ProblemData>(`${BackendRoutes.Problems}/${localStorage.getItem('username')}/${id}`)).data
    if (newData.problemType == 'Bug') {
      if (newData.product == '1') {
        newData.product = 'PetApp';
      }
      else if (newData.product == '2') {
        newData.product = 'SmartPet';
      }
    }
    
    setProblemData(newData);

    if (role === Roles.User && newData.status === 'New'){
      setDisabledFieldsForUserIfNotNewStatuses(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProblemData();

  }, []);



  const deleteProblemHandler = () => {
    setLoading(true);
    deleteProblem();
    localStorage.setItem('isProblemDeleted', 'true');
    setTimeout(function() { navigate(`../${Routes.Dashboard}/${localStorage.getItem('username')}`, { replace: true }); }, 1000);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    sendData();
    localStorage.setItem('isProblemUpdated', 'true');
    setTimeout(function() { fetchProblemData()}, 4000);
    
    setOpenPopUpUpdate(true);
    setNewComment('');
    localStorage.setItem('isProblemUpdated', 'false');
  };

  const deleteProblem = async () => {

    let config = {
      headers: {
        "Accept": "*/*",
      }
    }

    apsi_backend
    .delete(BackendRoutes.Problems+ '/' + localStorage.getItem('username')+'/'+id, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    });
  };

  const sendData = async () => {
    // PRZEKOPIOWAC DO UPDATE oraz odpowiednio:
    // ->Zmienic import { Routes } from '../../utils' na import { BackendRoutes, Routes } from '../../utils'.
    // ->Zmienic put(BackendRoutes.Problems, bodyContent, config) na post(BackendRoutes.Problems, bodyContent, config).
    // ->Dodac wiadomosc do bodyContent
    // ->Zmienic wage significant na high
    var date = "";
    if (problemData.proposedDeadline && problemData.proposedDeadline instanceof Date) {
      var year = problemData.proposedDeadline?.getFullYear();
      var month = problemData.proposedDeadline?.getMonth() + 1;
      var day = problemData.proposedDeadline?.getDate();
      date = year + '-' + month?.toString().padStart(2, '0') + '-' + day?.toString().padStart(2, '0')
    }
    else if (problemData.proposedDeadline !== null){
      var only_date = problemData.proposedDeadline.toString().split(' ', 2)[0];
      date = only_date;
    }

    if (problemData.problemType == 'Bug') {
      if (problemData.product == 'PetApp') {
        problemData.product = '1';
        if (problemData.component == 'Database') {
          problemData.component = '1';
        }
        else {
          problemData.component = '2';
        }
      }
      else if (problemData.product == 'SmartPet') {
        problemData.product = '2';
      }
    }

    var splitted = problemData.responsiblePerson.split(" ", 10);
    problemData.responsiblePerson = splitted[0];

    console.log(problemData.description);
    console.log(problemData.username);
    console.log(problemData.responsiblePerson);
    console.log(problemData.observers);
    console.log(date);
    console.log(problemData.weight);
    
    console.log(problemData.status);
    console.log(problemData.urgency);
    console.log(problemData.problemType);
    console.log(problemData.product);
    console.log(problemData.component);
    console.log(problemData.keywords);
    console.log(problemData.relatedProblems);
    
    
    console.log(newComment);
    console.log(problemData.username);

    let bodyContent: any;

    if (problemData.product === 'None' && problemData.component === 'None'){
      bodyContent = JSON.stringify({
        'description': problemData.description,
        'username': problemData.username,
        'responsiblePerson': problemData.responsiblePerson,
        'observers': problemData.observers,
        'proposedDeadline': date,
        'weight': problemData.weight,
        'status': problemData.status,
        'urgency': problemData.urgency,
        'problemType': problemData.problemType,
        'keywords': problemData.keywords,
        'relatedProblems': problemData.relatedProblems,
        'commentMessage': newComment,
        'commentMessageUsername': localStorage.getItem('username')
      });
    }
    else if (problemData.product !== 'None' && problemData.component === 'None'){
      bodyContent = JSON.stringify({
        'description': problemData.description,
        'username': problemData.username,
        'responsiblePerson': problemData.responsiblePerson,
        'observers': problemData.observers,
        'proposedDeadline': date,
        'weight': problemData.weight,
        'status': problemData.status,
        'urgency': problemData.urgency,
        'problemType': problemData.problemType,
        'product': problemData.product,
        'keywords': problemData.keywords,
        'relatedProblems': problemData.relatedProblems,
        'commentMessage': newComment,
        'commentMessageUsername': localStorage.getItem('username')
      });
  
    }
    else {
    bodyContent = JSON.stringify({
      'description': problemData.description,
      'username': problemData.username,
      'responsiblePerson': problemData.responsiblePerson,
      'observers': problemData.observers,
      'proposedDeadline': date,
      'weight': problemData.weight,
      'status': problemData.status,
      'urgency': problemData.urgency,
      'problemType': problemData.problemType,
      'product': problemData.product,
      'component': problemData.component,
      'keywords': problemData.keywords,
      'relatedProblems': problemData.relatedProblems,
      'commentMessage': newComment,
      'commentMessageUsername': localStorage.getItem('username')
    });

  }
    let config = {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      }
    }

    apsi_backend
      .post(BackendRoutes.Problems+ '/' + localStorage.getItem('username')+'/'+id, bodyContent, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
    // KONIEC
  };

  const handleClosePopUpUpdate = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPopUpUpdate(false);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.username = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeObservers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.observers = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.keywords = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.status = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRelProblems = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.relatedProblems = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
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
    const newProblemData: ProblemData = { ...problemData };
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
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.version = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.description = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.problemType = event.target.value;
    newProblemData.product = 'None';
    newProblemData.component = 'None';
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
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.weight = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.urgency = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRespPerson = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.responsiblePerson = event.target.value;
    setProblemData(newProblemData);
  };



  const handleChangeNewComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  return (
    <>
     <Box>
    {(loading===true) && (<div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />
      </div>
      )}
    {loading===false &&(
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
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
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
            disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
              label="Version"
              value={problemData.version}
              onChange={handleChangeVersion}
              placeholder="X"
              helperText="Add version of product related to the problem"
            />
          )}

          {problemData.product === 'PetApp' && (
            <TextField
              id="version"
              required
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
              label="Version"
              value={problemData.version}
              onChange={handleChangeVersion}
              placeholder="X"
              helperText="Add version of product's component related to the problem"
            />
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
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
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="related_problems"
          label="Related problems"
          value={problemData.relatedProblems}
          onChange={handleChangeRelProblems}
          helperText="Add related problems by problem ID "
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <DatePicker
            disablePast
            disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
            label="Proposed deadline"
            openTo="year"
            mask="__.__.____"
            views={['day']}
            value={problemData.proposedDeadline}
            onChange={(newValue) => {
              const newProblemData: ProblemData = { ...problemData };
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
          select
          disabled={role === Roles.User}
          id="status"
          label="Status"
          value={problemData.status}
          onChange={handleChangeStatus}
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          disabled={role === Roles.User}
          id="responsible_person"
          label="Responsible person"
          value={problemData.responsiblePerson}
          onChange={handleChangeRespPerson}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        sx={{ mt: 3, width: '100%' }}
        id="comments"
        label="Comments"
        disabled
        multiline
        rows={8}
        value= {prepareCommentToView()}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        sx={{ mt: 3, width: '100%' }}
        id="newComment"
        label="New comment"
        multiline
        rows={3}
        value={newComment}
        onChange={handleChangeNewComment}
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
          size="medium"
          type="submit"
          sx={{
            fontSize: 20,
            margin: 0.5,
            marginTop: 3,
            padding: 1,
            width: '20%',
          }}
        >
          Submit changes
        </Button>

        <Button
        variant="contained"
        size="medium"
        sx={{
          fontSize: 20,
          margin: 0.5,
          marginTop: 3,
          padding: 1,
          width: '20%',
        }}
        onClick={deleteProblemHandler}
      >
        Delete issue
      </Button>
      </div>
    </Box>
        )}
        </Box>
        <Snackbar open={openPopUpUpdate} anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClosePopUpUpdate}>
        <Alert onClose={handleClosePopUpUpdate} severity="success" sx={{ width: '100%' }}>
          Problem has been updated!
        </Alert>
      </Snackbar>
</>
  );
};
