import { React, useEffect, useState } from 'react';
import './App.css';
import { bankOne, bankTwo } from './resources/Bank';

function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  const playRecording = () => {
    let recordArray = recording.split(" ");
    let index = 0;
    const interval = setInterval(() => {
      const callAudio = document.getElementById(recordArray[index]);
      callAudio.currentTime = 0;
      callAudio.volume = volume;
      callAudio.play();
      index++;
    }, speed * 600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArray.length - 1
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Caja de Ritmos</h2>
        <div className="containerBtn">
          <div className="containerBox">
            <div className="containerBank">
              {bankOne.map(clip => [
                <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
              ])}
            </div>
            <div className="containerBank2">
              <h3>Volumen</h3>
              <input type="range" step="0.01" onChange={(e) => setVolume(e.target.value)} value={volume} max="1" min="0" className="InputStyles"></input>
              <h3>{recording} </h3>
              {recording && (
                <>
                  <button onClick={playRecording} className="button-play">Play</button>
                  <button onClick={() => setRecording("")} className="button-clear">Limpiar
                  </button>
                  <h3>Velocidad</h3>
                  <input type="range" step="0.01" onChange={(e) => setSpeed(e.target.value)} value={speed} max="1.2" min="0.1" className="InputStyles"></input>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

const Pad = ({ clip, volume, setRecording }) => {
  // const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [])

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound()
    }
  }

  const playSound = () => {
    const callAudio = document.getElementById(clip.keyTrigger);
    callAudio.currentTime = 0;
    callAudio.volume = volume;
    setRecording((prev) => prev + clip.keyTrigger + " ");
    // setActive(true);
    // setTimeout(() => setActive(false, 10))
    callAudio.play();
  }
  return (
    <div>

      <div onClick={playSound} className="btnLetters btn">
        <audio className="sound" id={clip.keyTrigger} src={clip.url}></audio>
        {clip.keyTrigger}
      </div>
    </div >
  )
}

export default App;
