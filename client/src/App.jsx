import React, { useState } from 'react';
import './App.css';
import QrScan from './components/QrScan';
import QrSubmit from './components/QrSubmit';

function App() {
    const [isCameraOpen, setIsCameraOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(true)
    const [scanResult, setScanResult] = useState("")

    const handleClick = () =>{
      setIsCameraOpen(!isCameraOpen);
    }

    const hookGetResultType = (x) => { 
      setScanResult(x.scanResult)
    }	

    const handleCloseModal = () => {
      setIsSubmitting(false);
      setScanResult("");
    }

    const handleSendData = (data) => {
      console.log("The data to be sent is", data);
  }


  return (
    <div className="app-container">
      <div className="app-header" onClick={handleClick}>ScanFlow</div>

        {scanResult && isSubmitting && (
          <QrSubmit
            qrText={scanResult}
            onClose={handleCloseModal}
            onSend={handleSendData}
          />
        )}

        <div className="app-content" >
          {isCameraOpen? <QrScan onScan={hookGetResultType}/> : <></>}
        </div>
      {scanResult}
    </div>
  );
}

export default App;

