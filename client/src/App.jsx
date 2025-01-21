import React, { useState } from 'react';
import './App.css';
import QrScan from './components/QrScan';

function App() {
    const [isCameraOpen, setIsCameraOpen] = useState(true)

    const [data, setData] = useState("")

    const handleClick = () =>{
      setIsCameraOpen(!isCameraOpen);
    }

    const hookGetResultType = (x) => { 
      setData(x.data)
    }	

  return (
    <div className="app-container">
      <div className="app-header" onClick={handleClick}>ScanFlow</div>
      <div className="app-content" >
        {isCameraOpen? <QrScan onScan={hookGetResultType}/> : <></>}
      </div>
      {data}
    </div>
  );
}

export default App;

