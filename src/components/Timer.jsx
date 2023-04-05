import './Chronometras.css';
import React, { useEffect, useState } from "react";
import {isMobile} from 'react-device-detect';
import sound from "./alarm.mp3"

const Mobile = ({iteration}) => {
  React.useEffect(() => {
    if (isMobile){
      document.getElementById("mobile-input").value = "";
    }
}, [iteration])
  if (isMobile){
    return (
      <div className='mobile-input mobile'>
          <h4>Input time and press "Start":</h4>
          <input id="mobile-input" type="Number" />
      </div>
    )
  }
  return (
    <>
    </>
  )
}
const Pradinis = ({iteration}) => {
  if (iteration === 0){
    return (
      <div className='mobile'>
        <h5>Press any number to reset</h5>
      </div>
    )
  }
  return (
    <>
    </>
  )
}

function CountDown(props) {
  const [counter, setCounter] = useState(props.kiekis);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter !== 0){
        setCounter(counter => counter - 1);
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    };
  }, [counter])
  props.perduotiKieki(counter);
  // if (((counter%60).toString()).length < 2){
  // {((counter/3600).toString()).length > 1? `${Math.floor(counter/3600)}:`:null}
  return (
    <div>
      <h1>{(Math.floor(counter/3600)) >= 1? `${Math.floor(counter/3600)}:`: null}{Math.floor(counter/3600) >= 1? ((Math.floor(counter/60%60).toString().length > 1? Math.floor(counter/60%60):`0${Math.floor(counter/60%60)}`)): Math.floor(counter/60)}:{((counter%60).toString()).length < 2? `0${counter%60}`: counter%60}</h1>
    </div>
  )
}

const Timer = () => {
    let alarm = new Audio(sound);
    let time = 0;
    let alarmkiekis = 2;
    const [reset, setReset] = useState(0);
    const [boundary, setBoundary] = useState(0)
    const [iteration, setIteration] = useState(0);
    const [masyvas, setMasyvas] = useState(["0", "0", ":", "1", "0", ":", "0", "0"]);
    const [data, setData] = useState([]);
    const [state, setState] = useState("false");
    const [skaicius, setSkaicius] = useState(time);
    const [mygtukas, setMygtukas] = useState("Start")
    const [input, setInput] = useState(masyvas.join(""));

    const handleClick = () => {
        // if (alarm.duration > 0 && !alarm.paused){
        //   alarm.pause();
        //   alarm.currentTime = 0;
        // }
        if (state === "false"){
          setState("true");
          setMygtukas("Stop");
          if (boundary === 0){
            setIteration(iteration => iteration +1);
            timeAdjuster();
            if (time !== 0){
              setBoundary(boundary => boundary + 1);
              alarmkiekis++;
              alarmkiekis++;
              // console.log(boundary);
            }
          }
        }
        else{
          setState("false");
          setMygtukas("Start");
        }
    }
    const timeAdjuster = () => {
      let hours = input.slice(0,2);
      let minutes = input.slice(3,5);
      let seconds = input.slice(6,8);
      time = (Number(hours)*3600+Number(minutes)*60+Number(seconds));
      if (time !== 0){
        setSkaicius(time);
        setIteration(iteration => iteration + 1);
        setReset(time);
        // console.log(reset);
      }
      else{
        setSkaicius(time);
      }
      // console.log(`${hours}:${minutes}:${seconds}, laikas - ${time}`);
    }
    const dorotiInformacija = (perduotas) => {
        setSkaicius(perduotas);
        // console.log(perduotas);
        if (perduotas === 0){
          alarm.play();
          handleClick();
        }
    }
    const output = () => {
        return (
            <div>
              <h1>{(Math.floor(skaicius/3600)) >= 1? `${Math.floor(skaicius/3600)}:`: null}{Math.floor(skaicius/3600) >= 1? ((Math.floor(skaicius/60%60).toString().length > 1? Math.floor(skaicius/60%60):`0${Math.floor(skaicius/60%60)}`)): Math.floor(skaicius/60)}:{((skaicius%60).toString()).length < 2? `0${skaicius%60}`: skaicius%60}</h1>
            </div>
        )
    }
    const resetButton = () => {
      // console.log(time);
        if(state === "false"){
          setSkaicius(reset);
        }
        else{
          handleClick();
          setSkaicius(reset);
        }
    }
    const newTime = () => {
      for (let i = data.length-1; i >= 0; i--){
        data.pop();
      }
      // console.log(masyvas)
      setMasyvas(["0", "0", ":", "0", "0", ":", "0", "0"]);
      setInput(masyvas.join(""));
      setIteration(1);
      setBoundary(0)
      time = 0;
    }
    const handleKeyDown = (event) => {
      if (!isNaN(Number(event.key))){
        if (data.length < 6){
          if (iteration === 0){
            setMasyvas(["0", "0", ":", "0", "0", ":", "0", "0"]);
            setIteration(iteration => iteration + 1);
          }
          data.push(event.key)
          if (data.length === 1){
            setInput("");
            masyvas[7] = event.key;
            setInput(masyvas.join(""));
          }
          else{
            for (let i = 0; i < 7; i++){
              if(masyvas[i] === ":"){
                setInput(masyvas.join(""));
                // console.log(masyvas);
              }
              else{
                if (masyvas[i+1] === ":"){
                  masyvas[i] = masyvas[i+2];
                  setInput(masyvas.join(""));
                  // console.log(masyvas, "I:", i);
                }
                else{
                    masyvas[i] = masyvas[i+1];
                    setInput(masyvas.join(""));
                    // console.log(masyvas, "I:", i);
                }
              }
            }
            masyvas[7] = event.key;
            // console.log(masyvas);
            setInput(masyvas.join(""));
            // console.log(data);
          }
        }
      }
    }
    React.useEffect(()=> {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    },[masyvas])
    React.useEffect(() => {
      setInput(masyvas.join(""));
    }, [masyvas])
    const disappear = (event) => {
      document.getElementsByClassName("footer")[0].classList.add("fade-out");
    }
    return (
    <div className="App">
      <div className='pavadinimas'>
        <h2>Timer</h2>
      </div>
      <Mobile iteration={iteration}/>
      <Pradinis iteration={iteration}/>
      <div className='footer fade-in'>
        <div>
          <p onClick={disappear}>x</p>
          </div>
        <p>Use the keyboard to input time. </p>
        <p>Press "start/stop" to start/stop the timer.</p>
        <p>Press "reset" to reset the timer to the selected time interval.</p>
        <p>Press "new time" to select a new time interval.</p>
      </div>
      <div id="tekstas">
        {state === "true"? <CountDown kiekis={skaicius} perduotiKieki={dorotiInformacija}/>: iteration > 1? output() : <h1>{input}</h1>}
      </div> 
      <div>
        <button onClick={handleClick}>{mygtukas}</button>
        <button onClick={resetButton}>Reset</button>
        <button onClick={newTime}>New time</button>
      </div>
    </div>
    );
}

export default Timer
