import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Routes } from '../../utils';
import { Roles } from '../../interface/enums';
import { useNavigate } from 'react-router-dom';

interface Data {
  definition: string;
  description: string;
}

interface Props{
  role: string;
}

export const FormPropsTextFields: React.FC<Props> = ({role}) => {

  const navigate = useNavigate();
  const [comment, setComment] = React.useState('');
  const [showNewCommentField, setShowNewCommentField] = React.useState<boolean>(false);
  const [activeFormButton, setActiveFormButton] = React.useState<boolean>(true);
  

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const commentHandler = () =>{
    setShowNewCommentField(true);
  }
  const commentSendingHandler = () =>{
    setShowNewCommentField(false);
    //send comment to backend + refresh list above + view an information
  }
  const deleteProblemHandler = () =>{
    //send delete to backend + actualize view + view an information
  }
  const editFormHandler = () =>{
      navigate(`../${Routes.ProblemEditForm}`, { replace: true });
  }

  function Row(props: { row: Data }) {
    const { row } = props;

    return (
      <Paper sx={{ width: "lg", my: 1, mx: 'auto'}}>
        <Grid container wrap="nowrap" spacing={2} sx={{m: 0, p: 0 }}>
          <Grid item xs={3} sx={{m: 0, p: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>{row.definition}</Typography>
         
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item xs sx={{m: 0, p: 2 }}>
            <Typography> {row.description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );

  }

  const [dataRows, setDataRows] = useState<Data[]>([]);

  useEffect(() => {
    //async axios zapytanie  ->  const jsonFromDatabase = axios.get("backend.com/problem/details/1562")
const jsonFromDatabase = {
  "Problem ID": "231",
  "Username":"Jan",
  "Observers":"Kasia, Basia",
  "Problem type": "Bug",
  "Weight": "Minor",
  "Urgency": "1",
  "Product":"PetApp",
  "Component":"Database",
  "Version": "1.2.1",
  "Keywords": "output",
  "Description": "I can't get the proper output",
  "Related problems": "23, 241",
  "Proposed deadline": "20.12.2021",
  "Status": "New",
  "Responsible person": "Andrzej Duda"
}
  let dataList: Data[] = [];
  Object.entries(jsonFromDatabase).forEach(([key, value]) => {
    const dataRow: Data = {
      definition: key,
      description: value
    }
    if (role === Roles.User && dataRow.definition === "Status" && dataRow.description !== "New")
    {
        setActiveFormButton(false);
    }
    dataList.push(dataRow)
  })

  setDataRows(dataList)
  
  }, []);

    return (
        <><Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        {dataRows.map((row, index) => {
          return <Row key={`${index}`} row={row} />;
        })}
      </Box>
      <Box>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ fontSize: 15, margin: 0.5, marginTop: 3, padding: 1, width: "15%" }}
              onClick={commentHandler}
            >
              Add comment
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ fontSize: 15, margin: 0.5, marginTop: 3, padding: 1, width: "15%" }}
              onClick={deleteProblemHandler}
            >
              Delete issue
            </Button>
            {activeFormButton===true &&<Button
              variant="contained"
              size="medium"
              sx={{ fontSize: 15, margin: 0.5, marginTop: 3, padding: 1, width: "15%" }}
              onClick={editFormHandler}
            >
              Edit form
            </Button>}
          </div>

        </Box>
        {showNewCommentField===true && <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center"  }}>
          <TextField
           sx ={{mt:3, width:"100%"}}
           
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
              sx={{ fontSize: 15, margin: 0.5, marginTop: 3, padding: 0.5, width: "12%" }}
              onClick={commentSendingHandler}
            >
              Send
            </Button>
        </Box>}</>

    );
  }

  export default FormPropsTextFields;