import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { BackendRoutes, Routes } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { ProblemData, Roles } from '../../interface';
import { apsi_backend } from '../common';

interface Data {
  definition: string;
  description: string;
}

interface Props {
  role: string;
}

export const ProblemDetailsContent: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showNewCommentField, setShowNewCommentField] =
    useState<boolean>(false);
  const [activeFormButton, setActiveFormButton] = useState<boolean>(true);
  const { id } = useParams();
  const [problemData, setProblemData] = useState<Data[]>();

  const fetchProblemData = async () => {
    const response_data = (
      await apsi_backend.get<ProblemData>(`${BackendRoutes.Problems}/${id}`)
    ).data;
    const parsedProblemDetails: Data[] = Object.entries(response_data).map(
      ([key, value]) => {
        if (role === Roles.User && key === 'Status' && value !== 'New') {
          setActiveFormButton(false);
        }
        return {
          definition: String(key),
          description: String(value),
        };
      }
    );
    setProblemData(parsedProblemDetails);
  };

  useEffect(() => {
    fetchProblemData();
  }, []);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const commentHandler = () => {
    setShowNewCommentField(true);
  };
  const commentSendingHandler = () => {
    setShowNewCommentField(false);
    //TODO: send comment to backend + refresh list above + view an information
  };
  const deleteProblemHandler = () => {
    //TODO: send delete to backend + actualize view + view an information
  };
  const editFormHandler = () => {
    navigate(`/${Routes.ProblemEditForm}/${id}`, { replace: true });
  };

  function Row(props: { row: Data }) {
    const { row } = props;

    return (
      <Paper sx={{ width: 'lg', my: 1, mx: 'auto' }}>
        <Grid container wrap="nowrap" spacing={2} sx={{ m: 0, p: 0 }}>
          <Grid item xs={3} sx={{ m: 0, p: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {row.definition}
            </Typography>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item xs sx={{ m: 0, p: 2 }}>
            <Typography> {row.description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        {problemData &&
          problemData.map((row, index) => {
            return <Row key={`${index}`} row={row} />;
          })}
      </Box>
      <Box>
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
            sx={{
              fontSize: 15,
              margin: 0.5,
              marginTop: 3,
              padding: 1,
              width: '15%',
            }}
            onClick={commentHandler}
          >
            Add comment
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{
              fontSize: 15,
              margin: 0.5,
              marginTop: 3,
              padding: 1,
              width: '15%',
            }}
            onClick={deleteProblemHandler}
          >
            Delete issue
          </Button>
          {activeFormButton === true && (
            <Button
              variant="contained"
              size="medium"
              sx={{
                fontSize: 15,
                margin: 0.5,
                marginTop: 3,
                padding: 1,
                width: '15%',
              }}
              onClick={editFormHandler}
            >
              Edit form
            </Button>
          )}
        </div>
      </Box>
      {showNewCommentField === true && (
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            px: 3,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            sx={{ mt: 3, width: '100%' }}
            id="comment"
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={handleComment}
          />
          <Button
            variant="contained"
            size="medium"
            sx={{
              fontSize: 15,
              margin: 0.5,
              marginTop: 3,
              padding: 0.5,
              width: '12%',
            }}
            onClick={commentSendingHandler}
          >
            Send
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProblemDetailsContent;
