import React, { useState } from "react";
import Chronometras from './components/Chronometras';
import Timer from "./components/Timer";
import "./App.css"

function App() {
  const [vaizdas, setVaizdas] = useState("Timer");
  const handleClickStopwatch = (event) => {
    if (vaizdas === "Timer"){
      setVaizdas("Chronometras");
      event.target.classList.add("highlight");
      event.target.nextElementSibling.classList.remove("highlight");
    }
  }
  const handleClickTimer = (event) => {
    if (vaizdas === "Chronometras"){
      setVaizdas("Timer");
      event.target.classList.add("highlight");
      event.target.previousElementSibling.classList.remove("highlight");
    }
  }
  return (
    <div className="Titulinis">
      <div className="nav">
        <ul>
          <li onClick={handleClickStopwatch}>Stopwatch</li>
          <li onClick={handleClickTimer} className="highlight" >Timer</li>
        </ul>
      </div>
      {vaizdas === "Chronometras"? <Chronometras /> : null}
      {vaizdas === "Timer"? <Timer />:null}
    </div>
  );
}
export default App;
