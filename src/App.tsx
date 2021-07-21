import React, { useState } from "react";
import './styles.scss';

const App: React.FC<unknown> = () => {
  const [weight, setWeight] = useState<string>('');
  const [kjConsumed, setkjConsumed] = useState<string>('');
  const [walkDistance, setWalkDistance] = useState<string>('');
  const [kjBurnedPerkg, setkjBurnedPerkg] = useState<string>('11.06');

  const handleClick = (event: { preventDefault: () => void; }) => {
    if(kjConsumed.length === 0 || weight.length === 0) {
      return false
    }
    const weightInt = parseInt(weight);
    const kjInt = parseInt(kjConsumed);
    const perKgInt = parseInt(kjBurnedPerkg);
    const kjBurned = kjInt/(weightInt*perKgInt);
    setWalkDistance(`You would have to walk ${calculateDistance(kjBurned, perKgInt)}km to burn off ${kjConsumed} kilojoules`)
    event.preventDefault();
  };

  const calculateDistance = (kjBurned: number, perKgInt: number ) => { 
    let distance;
    if (perKgInt === 11.06) {
      distance = kjBurned*3
    } else if (perKgInt === 14.74) {
      distance = kjBurned*5
    } else {
      distance = kjBurned*6
    }
    return distance.toFixed(2);
  }
  
  return (
    <div className="container">
    <h1 id="title">Kj Burn Calculator</h1>
    <p>Calculate how far you need to walk to burn off the kilojoules you consumed.</p>
      <form>
        <label htmlFor="weight" className="form--label"><b>Weight (kg)</b></label> 
        <br/>
        <input type="number" name="fweight" className="form--input" id="weight" required value={weight} onChange={(event) => {setWeight(event.target.value)}}  />
        <br/>
        <label htmlFor="speed"  className="form--label"><b>Walking speed</b></label> 
        <br/>
          <select className="form--input" name="speed" id="speed" value={kjBurnedPerkg}
            onChange={(event) => {setkjBurnedPerkg(event.target.value as unknown as string)}}>
              <option value="11.06" >Slow - 3km/h</option>
              <option value="14.74" >Moderate - 5km/h</option>
              <option value="18.44">Brisk - 6km/h</option>
          </select>
        <br/>
        <label htmlFor="kj_consumed" className="form--label"><b>How many kjs did you consume?</b></label>
        <br/>
        <input type="number" name="fkjs" className="form--input" id="kj_consumed" required value={kjConsumed} onChange={(event) => {setkjConsumed(event.target.value)}}  />
        <br/>
        <button className="form--button" onClick={handleClick}>
          Calculate walking distance
        </button>
        <p id="output">{walkDistance}</p>
      </form>
      
    </div>
  );
}

export default App;
