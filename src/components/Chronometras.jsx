import './Chronometras.css';
import React, { useEffect, useState } from "react";

function StartTimer(props) {
  const [counter, setCounter] = useState(props.kiekis);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter => counter + 1);
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [counter])
  props.perduotiKieki(counter);
  return (
    <div>
      <h1>{(Math.floor(counter/3600)) >= 1? `${Math.floor(counter/3600)}:`: null}{Math.floor(counter/3600) >= 1? ((Math.floor(counter/60%60).toString().length > 1? Math.floor(counter/60%60):`0${Math.floor(counter/60%60)}`)): Math.floor(counter/60)}:{((counter%60).toString()).length < 2? `0${counter%60}`: counter%60}</h1>
    </div>
  )
}

const Chronometras = () => {
    const [state, setState] = useState("false");
    const [skaicius, setSkaicius] = useState(0);
    const [mygtukas, setMygtukas] = useState("Start")
    const handleClick = (event) => {
        if (state === "false"){
        setState("true");
        setMygtukas("Stop");
        }
        else{
        setState("false");
        setMygtukas("Start");
        }
    }
    const dorotiInformacija = (perduotas) => {
        setSkaicius(perduotas);
    }
    const output = () => {
        return (
            <div>
            <h1>{(Math.floor(skaicius/3600)) >= 1? `${Math.floor(skaicius/3600)}:`: null}{Math.floor(skaicius/3600) >= 1? ((Math.floor(skaicius/60%60).toString().length > 1? Math.floor(skaicius/60%60):`0${Math.floor(skaicius/60%60)}`)): Math.floor(skaicius/60)}:{((skaicius%60).toString()).length < 2? `0${skaicius%60}`: skaicius%60}</h1>
            </div>
        )
    }
    const resetButton = () => {
        if(state === "false"){
        setSkaicius(0);
        }
        else{
        handleClick();
        setSkaicius(0);
        }
    }
    return (
    <div className="App">
      <div className='pavadinimas'>
        <h2>Stopwatch</h2>
      </div>
        <div id="tekstas">
          {state === "true"? <StartTimer kiekis={skaicius} perduotiKieki={dorotiInformacija}/>: output()}
        </div> 
        <div>
          <button onClick={handleClick}>{mygtukas}</button>
          <button onClick={resetButton}>Reset</button>
        </div>
    </div>
    );
}

export default Chronometras
