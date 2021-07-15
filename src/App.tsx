import React, { useState } from "react";
import './styles.scss';

const App: React.FC<unknown> = () => {
  const [weight, setWeight] = useState<string>('');
  const [kjConsumed, setkjConsumed] = useState<string>('');
  const [walkTime, setWalkTime] = useState<string>('');
  const [kjBurnedPerkg, setkjBurnedPerkg] = useState<number>(11.06);

  const handleClick = (event: { preventDefault: () => void; }) => {
    if(kjConsumed.length === 0 || weight.length === 0) {
      return false
    }
    const weightInt = parseInt(weight)
    const kjInt = parseInt(kjConsumed);
    const kjBurned = kjInt/(weightInt*kjBurnedPerkg)
    setWalkTime(`It would take you ${time_convert(kjBurned, kjBurnedPerkg)} to burn off ${kjConsumed} kilojoules`)
    event.preventDefault();
  };

  // const time_convert = (num: number) => { 
  //   const decimalTimeString = num;
  //   const n = new Date(0,0);
  //   n.setMinutes(+decimalTimeString * 60);
  //   return n.toTimeString().slice(0, 5);
  // }

  const time_convert = (kjBurned: number, kjBurnedPerkg: number ) => { 
    let distance;
    if (kjBurnedPerkg === 11.06) {
      distance = kjBurned*3
    } else if (kjBurnedPerkg === 14.74) {
      distance = kjBurned*5
    } else {
      distance = kjBurned*6
    }
    // const decimalTimeString = num;
    // const n = new Date(0,0);
    // n.setHours(+decimalTimeString * 60);
    // // return n.toTimeString().slice(0, 5);
    // console.log(kjBurnedPerkg)
    return distance
  }
  
  return (
    <div className="container">
    <h1 id="title">Kj Burn Calculator</h1>
    <p>Input your weight, walking speed and how many kilojoules you consumed to find out how long it would take to burn them off.</p>
      <form>
        <label className="form--label"><b>Weight (kg)</b></label> 
        <br/>
        <input type="number" name="fweight" className="form--input" id="weight" required value={weight} onChange={(event) => {setWeight(event.target.value)}}  />
        <br/>
        <label className="form--label"><b>Walking speed</b></label> 
        <br/>
          <select className="form--input" name="speed" id="speed" value={kjBurnedPerkg}
            onChange={(event) => {setkjBurnedPerkg(event.target.value as unknown as number)}}>
              <option value="11.06" >Slow - 3km/h</option>
              <option value="14.74" >Moderate - 5km/h</option>
              <option value="18.44">Brisk - 6km/h</option>
          </select>
        <br/>
        <label className="form--label"><b>How many kjs did you consume?</b></label>
        <br/>
        <input type="number" name="fkjs" className="form--input" id="kj_consumed" required value={kjConsumed} onChange={(event) => {setkjConsumed(event.target.value)}}  />
        <br/>
        <button onClick={handleClick}>
          Calculate walking time
        </button>
      </form>
      <p id="output">{walkTime}</p>
    </div>
  );
}

export default App;
