import React, { useState } from "react";
import RenderForm from './components/RenderForm';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

interface IInput {
  weight: string,
  kjConsumed: string,
  kjBurnedPerkj: number,
  walkTime: string
}


function App() {
  // const classes = useStyles();
  const [weight, setWeight] = useState<IInput["weight"]>('');
  const [kjConsumed, setkjConsumed] = useState<IInput["kjConsumed"]>('');
  const [walkTime, setWalkTime] = useState<IInput["walkTime"]>('');
  const [kjBurnedPerkj, setkjBurnedPerkj] = useState<IInput["kjBurnedPerkj"]>(11.06);
  const handleClick = (event: { preventDefault: () => void; }) => {
    if(kjConsumed.length === 0 || weight.length === 0) {
      alert('Please fill in all fields.');
      return false
    }
    const weightInt = parseInt(weight)
    const kjInt = parseInt(kjConsumed);
    const kjBurned = kjInt/(weightInt*kjBurnedPerkj)
    setWalkTime(time_convert(kjBurned))
    event.preventDefault();
  };

  function time_convert(num: number) { 
    var decimalTimeString = num;
    var n = new Date(0,0);
    n.setMinutes(+decimalTimeString * 60);
    return n.toTimeString().slice(0, 5);
  }
  

  return (
    <>
    <h1>Kj Burn Calculator</h1>
    <p>Input your weight, walking speed and how mant kilojoules you consumed to find out how long it would take to burn them off.</p>
      <form>
      <label><b>Weight: </b></label> 
        {/* <TextField id="standard-number" type="number" label="weight" value={weight} onChange={(event) => {setWeight(event.target.value)}} /> */}
        <input type="number" name="fweight" className="user_input" id="weight" required value={weight} onChange={(event) => {setWeight(event.target.value)}}  />
        <br/>
        <label><b>Walking speed: </b></label> 
          <select className="user_input" name="speed" id="speed" value={kjBurnedPerkj}
            onChange={(event) => {setkjBurnedPerkj(event.target.value as unknown as number)}}>
              <option value="11.06" >Slow - 3km/h</option>
              <option value="14.74" >Moderate - 5km/h</option>
              <option value="18.44">Brisk - 6km/h</option>
          </select>
        {/* <InputLabel id="demo-simple-select-label">Walking speed</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={kjBurnedPerkj}
            onChange={(event) => {setkjBurnedPerkj(event.target.value as number)}}
          >
            <MenuItem value={11.06}>Slow - 3km/h</MenuItem>
            <MenuItem value={14.74}>Moderate - 5km/h</MenuItem>
            <MenuItem value={18.44}>Brisk - 6km/h</MenuItem>
          </Select> */}
        <br/>

        <label><b>How many kilojoules did you consume?</b></label>
          <input id="kj_consumed" list="kilojoules-list" className="user_input" 
          value={kjConsumed} onChange={(event) => {setkjConsumed(event.target.value)}} />
          <datalist id="kilojoules-list">
              <option  value="2060">Big Mac</option>
              <option value="1900">Large chips</option>
              <option value="973">One slice of Hawaiian pizza</option>
              <option value="2163">Two pieces of fried chicken</option>

          </datalist>

        {/* <TextField id="standard-number"  type="number" label="Kilojoules consumed" value={kjConsumed} onChange={(event) => {setkjConsumed(event.target.value)}} /> */}
        <br/>
        <button onClick={handleClick}>
          Calculate walking time
        </button>
      </form>
      <p>{walkTime}</p>
      <RenderForm/>
    </>
  );
}

export default App;
