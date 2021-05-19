import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

interface IInput {
  weight: string,
  kjConsumed: string,
  kjBurnedPerkj: number,
  kjBurned: number
}


 function App() {
  const classes = useStyles();
  const [weight, setWeight] = useState<IInput["weight"]>('');
  const [kjConsumed, setkjConsumed] = useState<IInput["kjConsumed"]>('');
  const [kjBurned, setkjBurned] = useState<IInput["kjBurned"]| null>(null);
  const [kjBurnedPerkj, setkjBurnedPerkj] = useState<IInput["kjBurnedPerkj"]>(0);
  const handleClick = () => {
    const weightInt = parseInt(weight)
    const kjInt = parseInt(kjConsumed);
    console.log(kjBurnedPerkj)
    setkjBurned(kjInt/(weightInt*kjBurnedPerkj))
  };

  return (
    <>
    <form className={classes.root}>
      <TextField id="standard-number" type="number" label="weight" value={weight} onChange={(event) => {setWeight(event.target.value)}} />
      <br/>
      <InputLabel id="demo-simple-select-label">Walking speed</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kjBurnedPerkj}
          onChange={(event) => {setkjBurnedPerkj(event.target.value as number)}}
        >
          <MenuItem value={11.06}>Slow - 3km/h</MenuItem>
          <MenuItem value={14.74}>Moderate - 5km/h</MenuItem>
          <MenuItem value={18.44}>Brisk - 6km/h</MenuItem>
        </Select>
      <br/>
      <TextField id="standard-number"  type="number" label="Kilojoules consumed" value={kjConsumed} onChange={(event) => {setkjConsumed(event.target.value)}} />
      <br/>
      <Button onClick={handleClick} variant="outlined" color="primary">
        Primary
      </Button>
    </form>
    <p>{kjBurned}</p>
    </>
  );
}

export default App;
