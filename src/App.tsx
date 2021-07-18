import React, { useState } from "react";
import './styles.scss';

const App: React.FC<unknown> = () => {
  const [weight, setWeight] = useState<number>(0);
  const [kjConsumed, setkjConsumed] = useState<number>(0);
  const [walkDistance, setWalkDistance] = useState<string>('');
  const [kjBurnedPerkg, setkjBurnedPerkg] = useState<string>('11.06');

  const handleClick = (event: { preventDefault: () => void; }) => {
    if(kjConsumed === 0 || weight === 0) {
      return false
    }
    // const weightInt = parseInt(weight);
    // const weightInt = weight
    // const kjInt = parseInt(kjConsumed);
    const perKgInt = parseInt(kjBurnedPerkg);
    console.log(`kj consumed ${kjConsumed}`)
    const kjBurned = kjConsumed/(weight*perKgInt)
    console.log(`kj burnedPerKg ${kjBurnedPerkg}`)
    setWalkDistance(`You would have to walk ${calculateDistance(kjBurned, perKgInt)}km to burn off ${kjConsumed} kilojoules`)
    event.preventDefault();
  };

  const calculateDistance = (kjBurned: number, weight: number ) => { 
    let distance;
    if (weight === 11.06) {
      distance = kjBurned*3
    } else if (weight === 14.74) {
      distance = kjBurned*5
    } else {
      distance = kjBurned*6
    }
    return distance.toFixed(2);
  }
  
  return (
    <div className="container">
    <h1 id="title">Kj Burn Calculator</h1>
    <p>Input your weight, walking speed and how many kilojoules you consumed to find out how far you would have walk to burn them off.</p>
      <form>
        <label className="form--label"><b>Weight (kg)</b></label> 
        <br/>
        <input type="number" name="fweight" className="form--input" id="weight" required value={weight} onChange={(event) => {setWeight(parseInt(event.target.value))}}  />
        <br/>
        <label className="form--label"><b>Walking speed</b></label> 
        <br/>
          <select className="form--input" name="speed" id="speed" value={kjBurnedPerkg}
            onChange={(event) => {setkjBurnedPerkg(event.target.value as unknown as string)}}>
              <option value="11.06" >Slow - 3km/h</option>
              <option value="14.74" >Moderate - 5km/h</option>
              <option value="18.44">Brisk - 6km/h</option>
          </select>
        <br/>
        <label className="form--label"><b>How many kjs did you consume?</b></label>
        <br/>
        <input type="number" name="fkjs" className="form--input" id="kj_consumed" required value={kjConsumed} onChange={(event) => {setkjConsumed(parseInt(event.target.value))}}  />
        <br/>
        <button onClick={handleClick}>
          Calculate walking time
        </button>
      </form>
      <p id="output">{walkDistance}</p>
    </div>
  );
}

export default App;
